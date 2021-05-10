import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// make single imports for the 3 icons

const FontAwesomeIcon = () => {
  library.add(fas)
}

export default FontAwesomeIcon;
// https://www.digitalocean.com/community/tutorials/how-to-use-font-awesome-5-with-react