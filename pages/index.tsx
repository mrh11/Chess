import Board from '../Components/Board/Board';
import { StoreWrapper } from '../redux/store';

const App = (): JSX.Element => {
  return (
    <Board />
  )
}

export default StoreWrapper.withRedux(App);