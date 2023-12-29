import { useSearchEmails } from "../../queries/user.queries"
import { FieldWithCompletion } from "../Field";
import useDebounce from "../../queries/debouncer";

export default function MembersField({
  member,
  setMember,
  }: {
  member: string,
  setMember: (member: string) => void,
}) {
  const debouncedMember = useDebounce(member, 500);

  const {data} = useSearchEmails(debouncedMember);
  
  return (
    <FieldWithCompletion placeholder="Member" type="text" value={member} onChange={setMember} completion={data || []} />
  )
}
