import { gsap } from 'gsap'
import { CSSRulePlugin } from 'gsap/CSSRulePlugin'
import { CustomBounce } from 'gsap/CustomBounce'
import { CustomEase } from 'gsap/CustomEase'
import { CustomWiggle } from 'gsap/CustomWiggle'
import { Draggable } from 'gsap/Draggable'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { EasePack } from 'gsap/EasePack'
import { Flip } from 'gsap/Flip'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { Observer } from 'gsap/Observer'
import { Physics2DPlugin } from 'gsap/Physics2DPlugin'
import { PhysicsPropsPlugin } from 'gsap/PhysicsPropsPlugin'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { TextPlugin } from 'gsap/TextPlugin'

// Register once. Plugins attach to the shared gsap object, so existing
// `import { gsap } from 'gsap'` calls elsewhere can use them after this runs.
// ScrollTrigger is registered before ScrollSmoother, which depends on it.
gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  SplitText,
  Flip,
  Draggable,
  InertiaPlugin,
  Observer,
  MotionPathPlugin,
  DrawSVGPlugin,
  MorphSVGPlugin,
  ScrambleTextPlugin,
  TextPlugin,
  Physics2DPlugin,
  PhysicsPropsPlugin,
  CustomEase,
  CustomBounce,
  CustomWiggle,
  CSSRulePlugin,
  EasePack,
)

// Dev-only helpers: loaded lazily so they never reach the production bundle.
if (import.meta.env.DEV) {
  void Promise.all([import('gsap/GSDevTools'), import('gsap/MotionPathHelper')]).then(
    ([{ GSDevTools }, { MotionPathHelper }]) => {
      gsap.registerPlugin(GSDevTools, MotionPathHelper)
    },
  )
}

export {
  gsap,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  SplitText,
  Flip,
  Draggable,
  InertiaPlugin,
  Observer,
  MotionPathPlugin,
  DrawSVGPlugin,
  MorphSVGPlugin,
  ScrambleTextPlugin,
  TextPlugin,
  Physics2DPlugin,
  PhysicsPropsPlugin,
  CustomEase,
  CustomBounce,
  CustomWiggle,
  CSSRulePlugin,
}