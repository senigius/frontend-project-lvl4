import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';

const modals = {
  addChannel: Add,
  renameChannel: Rename,
  removeChannel: Remove,
};

export default (modalName) => modals[modalName];
