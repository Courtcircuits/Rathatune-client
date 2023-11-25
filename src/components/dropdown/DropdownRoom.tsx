import { useState } from "react";
import { DropdownMenu, Searchbar, SectionSeparator } from "./Dropdown";
import Check from "../../assets/icon/check";

function DropdownRoomSelector({ projects, selected }: { projects: { name: string, id: string }[], selected: string }) {
  const [search, setSearch] = useState("");
  return (
    <DropdownMenu>
        <div className="mx-5">
      <Searchbar placeholder="Search for a group..." value={search} onChange={(value) => setSearch(value)} />
      <SectionSeparator />
      <p className="text-tint500 text-sm mb-3">Groups</p>
      {
        projects.map((project, index) => <ProjectSelector key={index} project={project} selected={project.id === selected} />).filter((project) => project.props.project.name.toLowerCase().includes(search.toLowerCase()) || search === "")
      }
</div>
    </DropdownMenu>
  )
}


function ProjectSelector({ project, selected }: { project: { name: string, id: string }, selected: boolean }) {
  return (<div className='flex items-center justify-between group hover:cursor-pointer hover:bg-tint200 py-2 px-1 rounded-sm transition-colors ease-linear duration-100'>
    <p className='mr-5 text-lg'>{
      project?.name
    }</p>
    <div className='transition-colors ease-linear duration-100 stroke-tint700'>
      {selected && <Check width={20} height={20} />}
    </div>
  </div>)
}

export default DropdownRoomSelector;