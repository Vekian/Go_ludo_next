import ButtonSelect from "@/components/button/ButtonSelect";
import React from "react";

function Filters() {
  return (
    <div className="flex justify-around flex-wrap">
      <ButtonSelect
        label="Trier par"
        options={[
          { id: "2", label: "test1", value: "Test1" },
          { id: "3", label: "test2", value: "Test2" },
        ]}
        color="primary-900"
        width={150}
      />
      <ButtonSelect
        label="Catégorie"
        options={[
          { id: "2", label: "test1", value: "Test1" },
          { id: "3", label: "test2", value: "Test2" },
        ]}
        color="primary-500"
        width={150}
      />
      <ButtonSelect
        label="Thème"
        options={[
          { id: "2", label: "test1", value: "Test1" },
          { id: "3", label: "test2", value: "Test2" },
        ]}
        color="neutral-500"
        width={150}
      />
      <ButtonSelect
        label="Mode de jeu"
        options={[
          { id: "2", label: "test1", value: "Test1" },
          { id: "3", label: "test2", value: "Test2" },
        ]}
        color="secondary-600"
        width={180}
      />
      <ButtonSelect
        label="Durée"
        options={[
          { id: "2", label: "test1", value: "Test1" },
          { id: "3", label: "test2", value: "Test2" },
        ]}
        color="primary-500"
        width={150}
      />
    </div>
  );
}

export default Filters;
