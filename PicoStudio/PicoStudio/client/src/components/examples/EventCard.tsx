import EventCard from '../EventCard'
import minecraftImage from '@assets/generated_images/Minecraft_event_stage_scene_02cec325.png'

export default function EventCardExample() {
  return (
    <div className="max-w-sm">
      <EventCard
        title="Squid Pico Games"
        description="Una competencia épica inspirada en los juegos más desafiantes. ¿Podrás sobrevivir a todos los desafíos?"
        image={minecraftImage}
        onViewDetails={() => console.log('Event details clicked')}
      />
    </div>
  )
}