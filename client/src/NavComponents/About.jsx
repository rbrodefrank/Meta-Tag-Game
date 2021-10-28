import React from "react";
import "./About.css";
import BackToMain from "./BackToMain";

class Main extends React.Component {
  render() {
    return (
      <div className="about">
        <BackToMain />
        <h1>About the Game</h1>
        <p>As museums add collections online, the language that describes the objects - known as metadata - affects how people find and search for these objects; this same issue of language affecting search is also a part of your everyday life online! The language choices made by museum staff and website creators around the world are based on standards and rules. This means access is often limited to only those who understand the style used.</p>
        <p>As part of this game you can see how language and word choice may affect your ability to find things. To begin, you will be shown an image of an object in the Adler’s collection along with all the words that make it searchable online -- it’s metadata! Some of these terms were created by museum staff, some were created by AI and machine learning, and some were created by users like you! As the words fall it’s your job to collect them. Any words that you would use to describe the image you move to the right and any words you don’t think describe the image you move to the left.</p>
        <p>There is no right or wrong answer here! We want to know what you find useful! And after you select the terms created by others, we ask you to add your own! You are invited to add any additional words or phrases you think would be helpful to describe the image shown.</p>
        <p>Help the Adler improve access to our collections by tagging images with the words you would use to search for these images. There is no single right answer. You do not need to know what a certain thing is, or who a certain person is. We want to know how you would describe what you are looking at to a friend, or how you would describe an image to find it again later. That’s your language, and we want to include it!</p>
        <h2>Survey</h2>
        <p>The "Tag Along with Adler" Zooniverse project was launched with the goals of decentralizing the power of who creates museum descriptions, and to diversify language in Adler's catalogue by incorporating the language of users like you! Now we want to find a way to make the experience more fun and engaging for our guests - through a video game. Your role is essential to the Adler’s success!</p>
        <p>As we work to add these additional tags to our catalogue, we would like to get a better idea of who participated in this project. We recognize that to most effectively discuss this project as a way to incorporate users’ language into our database, we need to understand the demographics of the participants.</p>
        <p>The survey will take ~5 minutes. Your suggestions, comments, and advice will be invaluable as we evaluate how projects like this can diversify museum data, and engage communities in an interactive way! Survey is found here: </p>
        <div className="button-container text-align">
          <a className="link-button" href="https://docs.google.com/forms/d/e/1FAIpQLSeIZkqRRGzGffmoLM_k4J201oBPWxnLGliMg8kjXAkTl6CsAQ/viewform?usp=sf_link" target="_blank">Survey</a>
        </div>
      </div>
    );
  }
}

export default Main;