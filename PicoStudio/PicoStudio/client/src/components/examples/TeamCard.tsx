import TeamCard from '../TeamCard'

export default function TeamCardExample() {
  return (
    <div className="max-w-sm">
      <TeamCard
        id="example-1"
        name="Alex Rodriguez"
        role="Director Creativo"
        bio="Visionario detrás de los eventos más épicos de Pico Studios. Con más de 8 años de experiencia en gaming y eventos."
        imageUrl=""
        socialLinks='{"twitter": "@alexrodpico", "discord": "AlexR#1234"}'
        onViewProfile={(id) => console.log(`View profile for ${id}`)}
      />
    </div>
  )
}