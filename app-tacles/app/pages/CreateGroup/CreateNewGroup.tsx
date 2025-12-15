import "./style.css";
import DefaultInput from "../../components/DefaultInput/DefaultIput";
import { useState } from "react";
import CategoriesComponent from "../../components/CategoriesComponent/CategoriesComponent";
import ImageSelectorComponent from "../../components/ImageSelectorComponent/ImageSelectorComponent";

import girl from "../../assets/images/cyper-punk-girl.png";
import DefaultButtonSend from "../../components/DefaultButtonSend/DefaultButtonSend";
import { GroupService } from "../../services/GroupService";
import { useNavigate } from "react-router-dom";

export default function CreateNewGroup() {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [categoriesSelected, setCategoriesSelected] = useState<string[]>([]);
  const [imageSelected, setImageSelected] = useState(girl); // preview
  const [imageFile, setImageFile] = useState<File | null>(null); // File enviado

  const handleImageChange = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImageSelected(e.target.result as string); // preview
      }
    };
    reader.readAsDataURL(file);
  };

  const groupService = new GroupService(useNavigate);

  function isEmpty(str: string) {
    return str.trim() == "";
  }
  const handleCreateGroup = async () => {
    if (!imageFile) {
      alert("Selecione uma imagem!");
      return;
    }

    if (isEmpty(name)) {
      alert("O nome do servidor está vazio!");
      return;
    }
    if (isEmpty(link)) {
      alert("O link do servidor está vazio!");
      return;
    }
    if (isEmpty(description)) {
      alert("A descrição do servidor está vazio!");
      return;
    }

    if (categoriesSelected.length == 0) {
      alert("Adiciona pelo menos uma categoria!");
      return;
    }
    groupService.create(
      {
        name: name,
        link: link,
        description: description,
        image: imageFile,
        categories: categoriesSelected,
      },
      () => {
        alert("servidor criado");
        setName("");
        setDescription("");
        setLink("");
        setCategoriesSelected([]);
        setImageFile(null);
        setImageSelected(girl);
      },
      (e) => {
        alert(e.message);
      }
    );
  };

  return (
    <div className="create-new-group">
      <div className="form-fields-row">
        <div className="form-item">
          <ImageSelectorComponent
            image={imageSelected}
            handleImageChange={handleImageChange}
          />
        </div>

        <div className="form-item">
          <DefaultInput
            value={name}
            onChange={setName}
            labelTitle="Nome do servidor"
          />
          <DefaultInput
            value={link}
            onChange={setLink}
            labelTitle="Link do servidor"
          />
          <DefaultInput
            value={description}
            onChange={setDescription}
            labelTitle="Descrição"
          />
        </div>

        <div className="form-item">
          <CategoriesComponent
            categoriesSelected={categoriesSelected}
            onClickCallback={(category) => {
              setCategoriesSelected((prev) =>
                prev.includes(category)
                  ? prev.filter((v) => v !== category)
                  : [...prev, category]
              );
            }}
          />
        </div>

        <div className="form-item">
          <DefaultButtonSend
            text="Criar servidor"
            handleClick={handleCreateGroup}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
}
