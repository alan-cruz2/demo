import React from 'react';
import { connect } from 'react-redux';
import loadingSpinner from '../../assets/Facebook-1s-200px.svg';
import './scroll.scss';

const vh = (v) => {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (v * h) / 100;
};

class ScrollWidget extends React.Component {

  constructor(props) {
    super(props);

    this.appendItemsToRender = this.appendItemsToRender.bind(this);
    this.checkScrollPosition = this.checkScrollPosition.bind(this);
    this.state = {
      start: 0,
      end: 10,
      isLoading: false,
      itemsToRender: []
    };

  }

  componentDidMount() {
    const { loadItems } = this.props;
    loadItems({ start: 0, end: 10 });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { itemsToRender: nextItemsToRender, nextStart } = nextState;
    const { itemsToRender, start } = this.state;
    return nextItemsToRender.length !== itemsToRender.length;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items.length !== this.props.items.length) {
      this.appendItemsToRender(nextProps.items);
    }
  }

  checkScrollPosition(e) {
    const elem = e.target;
    const { loadItems } = this.props;

    if (elem.scrollTop >= (elem.scrollHeight - elem.offsetHeight - vh(40))) {
      console.log('**** fetching next');
      const {start, end} = this.state;
      const limit = end - start;
      !this.state.isLoading && this.setState({start: end, end: end + limit}, () => {
        console.log('setting loading');
        this.setState({ isLoading: true}, () => this.forceUpdate());

        setTimeout(() => loadItems({ start: this.state.start, end: this.state.end }), 500);
      });
    }
  }

  appendItemsToRender(items) {
    const { start, end } = this.state;

    // slice based on state
    const toRender = items.slice(start, end);

    const toAppend = toRender.map((item, index) => {
      return (<div className="item-container" key={`${item.title}.${index + start}`} tabIndex={index + 1   + start}>
        <div className="item-img">
          <img src={decodeURIComponent(item.media[0].filename.url)} alt={`${item.title}`} aria-hidden="true" />
        </div>
        <div className="item-details">
          <h2>{`${item.title}`}</h2>
          <span className="item-description">{item.description}</span>
        </div>
      </div>);
    });

    setTimeout(() => this.setState({ itemsToRender: this.state.itemsToRender.concat(toAppend), isLoading: false}), 1000);
  }

  render() {
    return [
    <section
      className="items-container"
      onScroll={this.checkScrollPosition}
      role="list"
    >
      {this.state.itemsToRender}
    </section>,
    this.state.isLoading ? <section className="loadingContainer" style={{height: '10vh'}}>
    <img src={loadingSpinner} />
  </section> : null
    ];
  }
}


const mapStateToProps = (state) => {
  console.log(state);
  return {
    items: state.items.items
  };
};
const mapDispatchToProps = (dispatch, props) => ({
  loadItems(searchParams, cb) {
    dispatch({ type:'LOAD_ITEMS', data: { searchParams } });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ScrollWidget);
