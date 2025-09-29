import HeroSection from '../HeroSection'

export default function HeroSectionExample() {
  return (
    <HeroSection 
      onViewEvents={() => console.log('View Events clicked')}
      onViewTeam={() => console.log('View Team clicked')}
    />
  )
}