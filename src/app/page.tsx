import ButtonPrimary from "@/components/button/ButtonPrimary";
import ButtonSelect from "@/components/button/ButtonSelect";
import Carousel from "@/components/carousel/Carousel";

export default function Home() {
  return (
    <main className="container pt-10">
      <div className="flex">
        <div className="w-2/3 ">
          <Carousel />
        </div>
        <div className="w-1/3 flex pl-16 pr-16 flex-col items-center justify-center">
          <h1 className="text-primary-950 text-center">
            Près de chez vous, des joueurs vous attendent !
          </h1>
          <div className="w-full flex flex-col">
            <label>Chercher une partie</label>
            <select>
              <option>Saboteur</option>
              <option>6 qui prend </option>
            </select>
          </div>
          <div className="w-full flex flex-col">
            <label>Une envie de jeu particulière ?</label>
            <select>
              <option>Saboteur</option>
              <option>6 qui prend </option>
            </select>
          </div>
          <ButtonPrimary label="Chercher" color="primary" />
        </div>
      </div>
      <div className="flex mt-10 justify-around">
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
    </main>
  );
}
