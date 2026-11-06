import alfariz from '@/assets/eqisi/team/team- blue and white/Alfariz — blue and white.png'
import cajigal from '@/assets/eqisi/team/team- blue and white/Cajigal — blue and white.png'
import flores from '@/assets/eqisi/team/team- blue and white/Flores — blue and white.png'
import joy from '@/assets/eqisi/team/team- blue and white/Joy — blue and white.png'
import malaca from '@/assets/eqisi/team/team- blue and white/Malaca — blue and white.png'
import manuel from '@/assets/eqisi/team/team- blue and white/Manuel — blue and white.png'
import trinidad from '@/assets/eqisi/team/team- blue and white/Trinidad — blue and white.png'
import tugas from '@/assets/eqisi/team/team- blue and white/Tugas — blue and white.png'

const leftTeam = [
  { name: 'Alfariz', image: alfariz },
  { name: 'Cajigal', image: cajigal },
  { name: 'Flores', image: flores },
  { name: 'Joy', image: joy },
]
const rightTeam = [
  { name: 'Malaca', image: malaca },
  { name: 'Manuel', image: manuel },
  { name: 'Trinidad', image: trinidad },
  { name: 'Tugas', image: tugas },
]

function PortraitGroup({ people, side }: { people: typeof leftTeam; side: 'left' | 'right' }) {
  return (
    <div className={`hero-team-group hero-team-group-${side}`}>
      {people.map((person, index) => (
        <figure className="hero-team-person" key={person.name} style={{ '--person-index': index } as React.CSSProperties}>
          <img src={person.image} alt="" loading="eager" />
        </figure>
      ))}
    </div>
  )
}

/** Matching portrait groups that frame the centered homepage message. */
export function TeamHeroVisual() {
  return (
    <div className="hero-team-frame">
      <PortraitGroup people={leftTeam} side="left" />
      <PortraitGroup people={rightTeam} side="right" />
    </div>
  )
}
