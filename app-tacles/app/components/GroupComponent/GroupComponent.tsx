import { Group } from "../../services/GroupService";
import "./GroupComponent.css";

type Props = {
  group: Group;
};

export function GroupComponent({ group }: Props) {
  const placeholderImage = "https://cdn.discordapp.com/embed/avatars/0.png";

  return (
    <div className="group-card">
      <img
        src={group.image || placeholderImage}
        alt={group.name}
        className="group-image"
      />
      <div className="group-content">
        <h2 className="group-name">{group.name}</h2>
        <p className="group-description">
          {group.description.length > 150
            ? group.description.slice(0, 147) + "..."
            : group.description}
        </p>
        <div className="group-tags">
          {group.categories.map((cat, idx) => (
            <span className="tag" key={idx}>
              #{cat.toLowerCase()}
            </span>
          ))}
        </div>
        <a
          href={group.link}
          target="_blank"
          rel="noopener noreferrer"
          className="join-button"
        >
          Entrar no servidor
        </a>
      </div>
    </div>
  );
}
