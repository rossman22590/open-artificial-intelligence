import { Configuration, OpenAIApi } from "openai";
import { keys } from '../../config/apiCredentials'

console.log(keys.REACT_APP_OPENAI_API_KEY)

const configuration = new Configuration({
  apiKey: keys.REACT_APP_OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

export const createOpenAI = async(params) => {
  if (!configuration.apiKey) {
      alert("OpenAI API key not configured, please follow instructions in README.md")
      return;
  }

  const description = params.description || '';
  if (description.trim().length === 0) {
      alert("Please enter a valid description")
      return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(description),
      temperature: 0.6,
    });
    console.log('************************************');
    console.log(completion);
    alert(completion.data.choices[0].text)
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
  }
}

export const chatOpenAI = async(params) => {
  if (!configuration.apiKey) {
      alert("OpenAI API key not configured, please follow instructions in README.md")
      return;
  }

  if (!params) {
      alert("Please enter a valid description")
      return;
  }

  try {
    const completion = await openai.createCompletion({
      model: params.optionSelected, //"text-davinci-002"
      prompt: generatePromptwitQuestion(params),
      temperature: params.temperature,
      max_tokens: params.maxLength,
      top_p: params.topP,
      frequency_penalty: params.frecuencyPenalty,
      presence_penalty: params.presencePenalty,
    });
    console.log('************************************');
    console.log(completion.data);
    return {
      response: completion.data.choices[0].text,
      total_tokens: completion.data.usage.total_tokens
    };
  } catch(error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
  }
}

const generatePrompt = (description) => {
    const capitalizedDescription =
    description[0].toUpperCase() + description.slice(1).toLowerCase();
    return `Suggest three names for an animal that is a superhero.
  
  Animal: Cat
  Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
  Animal: Dog
  Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
  Animal: ${capitalizedDescription}
  Names:`;
  }

  const textHasPoint = (text) => {
    
    if (text.trim().length === 0) {
      return true;
    }
    
    if (text.substr(text.length - 1, 1) == '.') {
      return true;
    }

    return false;
  }

  const generatePromptwitQuestion = (params) => {
    var question = `${textHasPoint(params.role) ? params.role : params.role+"."} ${textHasPoint(params.task) ? params.task : params.task+"." } ${params.context ? "Context:" : "" } ${textHasPoint(params.context) ? params.context : params.context+"." } with voice ${params.voiceSelected} for ${params.audiencesSelected} audience`
    console.log("**********************")
    console.log(question)
    return `${question}`;
  }
  

  export const engineList = async(params) => {
    try {
      const response = await openai.listEngines();
      return response;
    } catch(error) {
      if (error.response) {
        console.error(error.response.status, error.response.data);
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
      }
    }
  }

  export const trainingOpenAI = async(description) => {
    if (!configuration.apiKey) {
        alert("OpenAI API key not configured, please follow instructions in README.md")
        return;
    }
    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-002", //"text-davinci-002"
        prompt: generatePromptTraining2(description),
        temperature: 0.5,
        max_tokens: 10000,
        top_p: 1,
        frequency_penalty: 0.2,
        presence_penalty: 0,
      });
      console.log('************************************');
      console.log(completion.data);
      console.log(completion.data.choices[0].text);
      return {
        response: completion.data.choices[0].text,
        total_tokens: completion.data.usage.total_tokens
      };
    } catch(error) {
      if (error.response) {
        console.error(error.response.status, error.response.data);
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
      }
    }
  }


  const generatePromptTraining = (description) => {
    // const capitalizedDescription =
    // description[0].toUpperCase() + description.slice(1).toLowerCase();
    return `Suggest three names for an animal that is a superhero.
  
  Animal: Cat
  Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
  Animal: Dog
  Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
  Animal: ${description}
  Names:`;
  }

  const generatePromptTraining2 = (description) => {
    // const capitalizedDescription =
    // description[0].toUpperCase() + description.slice(1).toLowerCase();
    //considering the following answers, please give me an answer that takes into account what has already been mentioned.
    //according to the following answers, what is the main idea addressed?
    return `considering the following answers, please give me an answer that takes into account what has already been mentioned.
  
  answer: To condense it all down to what I really want to do but also am wanting to make sure itâ€™s right for me too. Like I have soooo many ways I could go( launching a lifestyle blog-been on the back burner for three years! But no more procrastinating.)  Plus, am a widow with two young men still at home. I want to crystallize it all , still down to the most crucial, best of the best goals. Hope that helps!
  answer: I am my biggest challenge. Trying to learn technology and computer systems that I just don't understand. This gets me overwhelmed, full of anxiety which leads into migraines. It is extremely tough to keep motivating yourself when you are routinely stuck on systems you don't grasp the concepts of and on top of that, do not have guidance for.
  answer: Feeling completely beholden to my hourly, entry level job that I don't enjoy and dreaming of a way to work independently. I have no experience doing so and I thought writing would be a good idea because I am very talented at it and it seems like an area of independent employment that doesn't necessarily require a ton of experience, or at least it has an entry-level niche to get your start in. A lot of the other independent lines of work seemed to require massive amounts of experience and/or a college degree.
  answer: I broke my heel bone 8 weeks ago and I havenâ€™t been able to work at all. Iâ€™m staying with my mom. I thought my cast would come off today however it looks like 3 more weeks in a cast with my foot propped up up.  I need a job that will overlook the cast and hire me right away regardless of my foot.
  answer: Cost of living conservatively is beyond my wages even when working overtime. Everything including housing figures to a minimum living wage of $53.00 an hour, not the $14.00 that is a      dollar less per hour than I made in the same city. For the same kind of security officer job in 1986.
  answer: I need to find my own home asap so I can do things I want to do like go back to school work a few hrs a wk as Im disabled n cant work more than mayb 20 hrs a wk Im just stuck right now unable to move forward til I can get into my own home I am homeless at the moment.
  answer: Not having a job that meets my monthly bills. I am also in physical pain do to inflammation in my body which I am staring a, cleanse in about a week that may help as well as a change to my diet. I was a homeschool mother and homemaker. I co-owned a real estate appraisal business with my ex husband but mostly he ran it. My professional  skills are limited  because I dedicated  myself to the home.
  answer: Right now off work due to medical issues job not owning injury,; herniated disc, and spinal stenosis(limited due when I  return to the post office). Thinking about leaving job and opening homebase business.
  answer: Overcoming fear of making too much money to keep my subsidized housing before I can make enough money to live without it, which is what I want anyway. I desperately want to become financially independent.
  answer: I have many talents and things that i enjoy so I always get lost. I don't know which path is the right path and i fear that choosing the wrong one will not allow me to do any of them. But, I know that if I chose one and stuck to it I would be successful, so why can't I ever stick to just one thing?
  answer: My biggest present challenge is completing and finish all of the marketing collateral and assets I need.  This isnâ€™t my most important task, but it is the one that needs to be successfully completed first in order for me to start doing the things that will take me where I want to be in 2019.
  answer: I have a colonoscopy bag right now,but will be removed in approximately30 days.I also need to get my new laptop working on internet, which will happen next week.
  answer: Finding the right niche,and once I get my business off the ground finding the right employees to keep the business running so that I can expand and grow!!!
  answer: I put everyone before myself no matter what. Even if its something to advance myself,I'll stop what im doing to help whoever is asking me for help. I have a very hard time saying no because I feel selfish If I do.
  answer: Determining where to priorize and allocate my time. Torn between full time job, side job I want to be full time job, working towards an MBA`;
  }


  export const boldPromiseOpenAI = async(params, typeQuestion) => {
    if (!configuration.apiKey) {
        alert("OpenAI API key not configured, please follow instructions in README.md")
        return;
    }
  
    if (!params) {
        alert("Please enter a valid description")
        return;
    }
    var prompt = null;

    switch (typeQuestion) {
      case 1:
        prompt = generatePromptBoldPromiseBiggestDesire(params)
        break;
      case 2:
        prompt = generatePromptBoldPromiseBiggestPain(params)
        break;
      case 3:
        prompt = generatePromptBoldPromiseBiggestObjection(params)
        break;
    }

    
    try {
      const completion = await openai.createCompletion({
        model: params.optionSelected, //"text-davinci-002"
        prompt: prompt,
        temperature: params.temperature,
        max_tokens: params.maxLength,
        top_p: params.topP,
        frequency_penalty: params.frecuencyPenalty,
        presence_penalty: params.presencePenalty,
      });
      console.log('************************************');
      console.log(completion.data);
      return {
        response: completion.data.choices[0].text,
        total_tokens: completion.data.usage.total_tokens
      };
    } catch(error) {
      if (error.response) {
        console.error(error.response.status, error.response.data);
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
      }
    }
  }
  
  const generatePromptBoldPromiseBiggestDesire = (params) => {
    // var question = `in one phrase What is biggest desire for woman that want lose weight through an online course with the following human's desires ${params.humanDiseresSelected.join(", ")} ?`;
    var question = `in one phrase What is biggest desire for ${params.questionWho} that ${params.questionWhat} ${params.questionHow} with the following human's desires ${params.humanDiseresSelected.join(", ")} ?`;
    console.log("**********************")
    console.log(question)
    return `${question}`;
  }

  const generatePromptBoldPromiseBiggestPain = (params) => {
    // var question = `in one phrase What is biggest pain for woman that want lose weight through an online course with possible things that doesn't want?`;
    var question = `in one phrase What is biggest pain for ${params.questionWho} that ${params.questionWhat} ${params.questionHow} with possible things that doesn't want?`;
    // var question = `in one phrase what specific thing ${params.questionWho} don’t when ${params.questionWhat} ${params.questionHow}?`;
    //var question = `in one phrase what specific thing ${params.questionWho} don’t when ${params.questionWhat} ${params.questionHow}?`;
    console.log("**********************")
    console.log(question)
    return `${question}`;
  }

  const generatePromptBoldPromiseBiggestObjection = (params) => {
    // var question = `in one phrase tell me what limitation has the woman have to want lose weight through an online course?`;
    var question = `in one phrase tell me what limitation has the ${params.questionWho} have to ${params.questionWhat} ${params.questionHow}?`;
    console.log("**********************")
    console.log(question)
    return `${question}`;
  }