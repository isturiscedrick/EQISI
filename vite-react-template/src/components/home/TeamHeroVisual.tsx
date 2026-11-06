import alfariz from '@/assets/eqisi/team/team- blue and white/Alfariz — blue and white.png'
import cajigal from '@/assets/eqisi/team/team- blue and white/Cajigal — blue and white.png'
import flores from '@/assets/eqisi/team/team- blue and white/Flores — blue and white.png'
import joy from '@/assets/eqisi/team/team- blue and white/Joy — blue and white.png'
import malaca from '@/assets/eqisi/team/team- blue and white/Malaca — blue and white.png'
import manuel from '@/assets/eqisi/team/team- blue and white/Manuel — blue and white.png'
import trinidad from '@/assets/eqisi/team/team- blue and white/Trinidad — blue and white.png'
import tugas from '@/assets/eqisi/team/team- blue and white/Tugas — blue and white.png'
import { asset } from '@/lib/assets'

const portraits = [
  { name: 'Alfariz', image: alfariz },
  { name: 'Cajigal', image: cajigal },
  { name: 'Flores', image: flores },
  { name: 'Joy', image: joy },
  { name: 'Malaca', image: malaca },
  { name: 'Manuel', image: manuel },
  { name: 'Trinidad', image: trinidad },
  { name: 'Tugas', image: tugas },
  { name: 'EQISI team', image: asset('logo.webp') },
]

/** Blue-and-white team portrait strip for the homepage hero. */
export function TeamHeroVisual() {
  return (
    <div className="team-hero-visual" aria-label="Meet the people behind EQISI">
      <div className="team-hero-heading">
        <span className="team-hero-kicker">People behind the operation</span>
        <span className="team-hero-caption">One team. Connected expertise.</span>
      </div>
      <div className="team-hero-portraits">
        {portraits.map((person, index) => (
          <figure className="team-hero-portrait" key={person.name} style={{ '--portrait-index': index } as React.CSSProperties}>
            <img src={person.image} alt={person.name === 'EQISI team' ? 'EQISI company logo' : `EQISI team portrait — ${person.name}`} loading={index < 5 ? 'eager' : 'lazy'} />
            {person.name !== 'EQISI team' && <figcaption>{person.name}</figcaption>}
          </figure>
        ))}
      </div>
    </div>
  )
}
