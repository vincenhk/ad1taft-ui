import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faHouseChimney,
  faSliders,
  faCashRegister,
  faFileInvoiceDollar,
  faScaleUnbalancedFlip,
  faFileLines,
  faGear,
  faPersonCircleQuestion,
  faQuestion,
  faChevronDown,
  faO,
  faTrashCan,
  faX,
  /*Alert Notification*/
  faCircleCheck,
  faCircleExclamation,
  faCircleInfo,
  /*Dialog Notification*/
  faFloppyDisk,
  faCircleQuestion,
  faPenToSquare,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons'

/*
 *  ====== ADD THE ICONS ALWAYS INSERT INTO LIBRARY ======
 *
 * without kid we just can call with component register the app.component('font-awesome-icon', FontAwesomeIcon)
 *
 * Adding Styling inside vue
 * using several attributes inside component
 *   ANIMATION
 *   - rotation
 *   - flip
 *
 *   SHAPE
 *   - size
 *   - fixed-width
 *
 *   COLOR
 *   - :style="{ color: 'white' }"
 *   - wheather want color icon white/black using inverse
 *
 *   More of this u can read documentation hire https://docs.fontawesome.com/web/use-with/vue/dig-deeper
 * */

library.add(
  faHouseChimney,
  faSliders,
  faCashRegister,
  faFileInvoiceDollar,
  faScaleUnbalancedFlip,
  faFileLines,
  faGear,
  faPersonCircleQuestion,
  faQuestion,
  faChevronDown,
  faO,
  faTrashCan,
  faX,
  faCircleCheck,
  faCircleExclamation,
  faCircleInfo,
  faFloppyDisk,
  faCircleQuestion,
  faPenToSquare,
  faQuestionCircle
)

/* Tried to add all to library but its taking too long process time */
// import * as icons from '@fortawesome/free-solid-svg-icons';
// for (const iconName in icons) {
//   const iconDefinition = icons[iconName];
//   library.add(iconDefinition);
// }
