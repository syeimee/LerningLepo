import "./page.css"
import Title from "../components/Title";
import TopicList from "../components/TopicList";
export default function Home() {
  return (
    <div className="container">
      <Title />
      <TopicList />
    </div>
  );
}