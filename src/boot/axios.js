// import something here
import axios from "axios";

axios.defaults.adapter = function() {
  return require('axios/adapters/http'); // always use Node.js adapter
};

// "async" is optional
export default async ({ /* app, router, Vue, ... */ }) => {
  // something to do
}
