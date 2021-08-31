// TODO: label below
// TODO: new design with margin

/* Import { createStore } from 'redux' */
const { createStore, combineReducers } = Redux;

/* Import { connect, Provider } from 'react-redux' */
const { connect, Provider } = ReactRedux;

/*********
* REACT
**********/
class UnconnectedComponent extends React.Component {
  constructor({x1, y1, x2, y2, setCoord1, setCoord2}) {
    super({x1, y1, x2, y2, setCoord1, setCoord2});
  }
  render() {
    return (
      <div id='container'>
        <Canvas>
          <Draggable x={this.props.x1} y={this.props.y1} changeCoord={this.props.setCoord1}/>
          <Draggable x={this.props.x2} y={this.props.y2} changeCoord={this.props.setCoord2}/>
        </Canvas>
        <div className='code'>
          <p>Coord 1: {this.props.x1}, {this.props.y1}</p>
          <p>Coord 2: {this.props.x2}, {this.props.y2}</p>
        </div>
      </div>
    );
  }
}

const componentMapStateToProps = (state, ownProps) => {
  return {
    x1: state.x1,
    y1: state.y1,
    x2: state.x2,
    y2: state.y2
  }
}

const componentMapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCoord1: (x, y) => {
      dispatch({
        type: 'COORD1',
        x,
        y
      })
    },
    setCoord2: (x, y) => {
      dispatch({
        type: 'COORD2',
        x,
        y
      })
    }
  }
}

const Component = connect(componentMapStateToProps, componentMapDispatchToProps)(UnconnectedComponent);

class UnconnectedCanvas extends React.Component {
  constructor({canvasWidth, canvasHeight, width, height, resize}) {
    super({canvasWidth, canvasHeight, width, height, resize});
  }
  
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
        width={this.props.canvasWidth} height={this.props.canvasHeight} 
        viewBox={`0 0 ${this.props.width} ${this.props.height}`} >
        {this.props.children}
      </svg>
    );
  }
  
  componentDidMount() {
    let resize = Rx.Observable.fromEvent(window, 'resize').map(() => ({
      width: window.innerWidth, 
      height: window.innerHeight
    }));
    
    resize.forEach(({width, height}) => {
      this.props.resize(width, height);
    });
  }
}

const canvasMapStateToProps = (state, ownProps) => {
  return {
    canvasWidth: state.canvasWidth,
    canvasHeight: state.canvasHeight,
    width: state.width,
    height: state.height
  }
}

const canvasMapDispatchToProps = (dispatch, ownProps) => {
  return {
    resize: (width, height) => {
      dispatch({
        type: 'RESIZE',
        width,
        height
      })
    }
  }
}

const Canvas = connect(canvasMapStateToProps, canvasMapDispatchToProps)(UnconnectedCanvas);

class UnconnectedDraggable extends React.Component {
  constructor({x, y, zoom, changeCoord}) {
    super({x, y, zoom, changeCoord});

    this.state = {
      dragging: false,
    };
    this.size = 30;
  }

  render() {
    return (
      <g className={this.state.dragging ? "dragging" : "draggable"} 
        ref={(draggable) => { this.draggable = draggable; }}
        transform={`translate(${this.props.x},${this.props.y})`}>
        <rect x={-this.size/2} y={-this.size/2} width={this.size} height={this.size}/>
        <text x={this.size/2} y={-this.size/2} textAnchor="left" stroke="none">
          {`${this.props.x}, ${this.props.y}`} 
        </text>
      </g>
    );
  }
  
  componentDidMount() {
    const mouseEventToCoordinate = mouseEvent => ({x: mouseEvent.clientX, y: mouseEvent.clientY});
    const touchEventToCoordinate = touchEvent => {
      touchEvent.preventDefault();
      return {x: touchEvent.touches[0].clientX, y: touchEvent.touches[0].clientY};
    };
    
    // Event handling using Reactive JS
    let mouseDowns = Rx.Observable.fromEvent(this.draggable, "mousedown").map(mouseEventToCoordinate);
    let mouseMoves = Rx.Observable.fromEvent(window, "mousemove").map(mouseEventToCoordinate);
    let mouseUps = Rx.Observable.fromEvent(window, "mouseup");
    
    let touchStarts = Rx.Observable.fromEvent(this.draggable, "touchstart").map(touchEventToCoordinate);
    let touchMoves = Rx.Observable.fromEvent(this.draggable, "touchmove").map(touchEventToCoordinate);
    let touchEnds = Rx.Observable.fromEvent(window, "touchend");
    
    let dragStarts = mouseDowns.merge(touchStarts);
    let moves = mouseMoves.merge(touchMoves);
    let dragEnds = mouseUps.merge(touchEnds);
    
    let drags = dragStarts.concatMap(dragStartEvent => {
      const xDelta = this.props.x - dragStartEvent.x*this.props.zoom;
      const yDelta = this.props.y - dragStartEvent.y*this.props.zoom;
      return moves.takeUntil(dragEnds).map(dragEvent => {
        const x = dragEvent.x*this.props.zoom + xDelta;
        const y = dragEvent.y*this.props.zoom + yDelta;
        return {x, y};
      })
    });
    
    dragStarts.forEach(() => {
      this.setState({dragging: true});
    });
    
    drags.forEach(coordinate => {
      this.props.changeCoord(coordinate.x, coordinate.y);
    });
    
    dragEnds.forEach(() => {
      this.setState({dragging: false});
    });
  }
}

const draggableMapStateToProps = (state, ownProps) => {
  return {
    zoom: state.zoom
  }
}

const Draggable = connect(draggableMapStateToProps)(UnconnectedDraggable);

const initialState = {
  // Component specific state
  x1: 110,
  y1: 120,
  x2: 190,
  y2: 180,
  
  // Canvas and draggable specific state
  canvasWidth: 500,
  canvasHeight: 500,
  width: 400,
  height: 400,
  zoom: 1 
};

const mainReducer = (state = initialState, action) => {
  function overrideCoord(x, y) {
    x = Math.min(x, state.width);
    y = Math.min(y, state.height);
    x = Math.max(x, 0);
    y = Math.max(y, 0);
    x = Math.round(x);
    y = Math.round(y);
    return {x, y};
  }
  switch (action.type) {
    case 'COORD1': {
        const {x, y} = overrideCoord(action.x, action.y);
        return Object.assign({}, state, {
          x1: x,
          y1: y
        });
      }
    case 'COORD2': {
        const {x, y} = overrideCoord(action.x, action.y);
        return Object.assign({}, state, {
          x2: x,
          y2: y
        });
      }
    case 'RESIZE':
      const minSize = Math.min(action.width, action.height);
      if(minSize <= 500) {
        return Object.assign({}, state, {
          canvasWidth: minSize,
          canvasHeight: minSize,
          zoom: state.width/minSize
        });
      }else{
        return state;
      }
    default:
      return state;
    }
};

const store = createStore(mainReducer);

ReactDOM.render(
  <Provider store={store}>
    <Component />
  </Provider>,
  document.getElementById('app')
);