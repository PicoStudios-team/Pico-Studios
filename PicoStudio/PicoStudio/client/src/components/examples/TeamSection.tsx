import TeamSection from '../TeamSection'

export default function TeamSectionExample() {
  return (
    <TeamSection onViewMember={(memberId) => console.log(`View member ${memberId}`)} />
  )
}