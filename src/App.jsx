import './App.css'

function PlantCard({ image, name, desc }) {
  return (
    <div className="container">
      <div className="image" style={{ backgroundImage: `url(${image})` }} />
      <div className="name">{name}</div>
      <div className="desc">{desc}</div>
      <div className="container2">
        <div className="icon">icon</div>
        <div className="chart">chart</div>
        <div className="follow"><b>follow</b></div>
      </div>
    </div>
  );
}

function App() {
  const data = {
    name: "Osteosperum",
    desc: "is a genus of flowering plants belonging to the Calenduleae.",
    image: "https://logoeps.com/wp-content/uploads/2012/10/flower-logo-vector.png"
  };

  const flowersList = [data, data];

  return (
    <div className="base">
      {flowersList.map((item, index) => <PlantCard key={index} {...item} />)}
    </div>
  );
}

export default App;
