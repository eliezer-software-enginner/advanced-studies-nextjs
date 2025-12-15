import { GroupComponent } from "../../components/GroupComponent/GroupComponent";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { RoutesName } from "../../navigation/RoutesName";
import { Group, GroupService } from "../../services/GroupService";
import { useEffect, useState } from "react";

// const groups: Group[] = [
//   {
//     name: "Servidor de Histórias Bizaras",
//     image: "",
//     categories: ["ANIME", "CHAT", "JOGOS", "COMUNIDADE"],
//     description:
//       "Explore o mundo das histórias mais extraordinárias e estranhas. Compartilhe as suas histórias e junte-se à discussão sobre os eventos mais estranhos que já aconteceram.",
//   },
// ];

export default function Groups() {
  const navigate = useNavigate();

  const [groups, setGroups] = useState<Group[]>([]);
  const groupService = new GroupService(useNavigate);

  useEffect(() => {
    async function fetch() {
      const resp = await groupService.list();
      setGroups(resp);
    }
    fetch();
  }, []);

  return (
    <div className="groups-page">
      <div className="groups-header">
        <h1 className="groups-title">Servidores da Comunidade</h1>
        <button
          className="create-button"
          onClick={() => navigate(RoutesName.NEW_GROUP)}
        >
          Criar novo servidor
        </button>
      </div>

      {groups.map((group, i) => (
        <GroupComponent group={group} key={i} />
      ))}
    </div>
  );
}
