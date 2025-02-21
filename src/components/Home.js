// import { useEffect, useState } from "react";
// import Header from "../directives/Header";
// import axios from "axios";

// export default function Home() {
    
//     useEffect(() => {
//         const startBtn = document.querySelector(".start-btn");
//         const popupInfo = document.querySelector(".popup-info");
//         const exitBtn = document.querySelector(".exit-btn");
//         const main = document.querySelector(".main");
//         const continueBtn = document.querySelector(".continue-btn");
//         const quizSection = document.querySelector(".quiz-section");
//         const quizBox = document.querySelector(".quiz-box");

//         getData();

//         if (startBtn && popupInfo && main) {
//             startBtn.onclick = () => {
//                 popupInfo.classList.add("active");
//                 main.classList.add("active");
//             };
//         }

//         if (exitBtn && popupInfo && main) {
//             exitBtn.onclick = () => {
//                 popupInfo.classList.remove("active");
//                 main.classList.remove("active");
//             };
//         }

//         if (continueBtn && quizSection && popupInfo && main && quizBox) {
//             continueBtn.onclick = () => {
//                 quizSection.classList.add("active");
//                 popupInfo.classList.remove("active");
//                 main.classList.remove("active");
//                 quizBox.classList.add("active");
//             };
//         }

//         return () => {
//             if (startBtn) startBtn.onclick = null;
//             if (exitBtn) exitBtn.onclick = null;
//             if (continueBtn) continueBtn.onclick = null;
//         };
//     }, []);

    
//     const getData = () => {
//         axios.get(`https://thingproxy.freeboard.io/fetch/https://api.jsonserve.com/Uw5CrX`)
//             .then((response) => console.log(response.data))
//             .catch((error) => console.log(error));
//     };

    
//     let questionCount=0;
    

//     return (
//         <>
//             <div className="main">
//                 <Header />
//                 <div className="containers">
//                     <section className="quiz-section">
//                         <div className="quiz-box">
//                             <h1>Quiz</h1>
//                             <div className="quiz-header">
//                                 <span>Quiz Website Tutorials</span>
//                                 <span className="header-score">Score: 0 / 5</span>
//                             </div>
//                             <h2 className="question-text">What does HTML stand for?</h2>
//                             <div className="option-list">
//                                 <div className="option">
//                                     <span>A. hyper multi</span>
//                                 </div>
//                                 <div className="option">
//                                     <span>B. hyper text lenguehe</span>
//                                 </div>
//                                 <div className="option">
//                                     <span>C. hyper text mark up lenguage</span>
//                                 </div>
//                                 <div className="option">
//                                     <span>D. home text</span>
//                                 </div>
//                             </div>
//                             <div className="quiz-footer">
//                                 <span className="question-total">1 of 5 Questions</span>
//                                 <button className="next-btn">Next</button>
//                             </div>
//                         </div>
//                     </section>
//                     <section className="home">
//                         <div className="home-content">
//                             <h1>Quiz Website</h1>
//                             <p>
//                                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id
//                                 varius diam. Cras varius urna vel velit molestie, et lacinia ipsum
//                                 blandit.
//                             </p>
//                             <button className="start-btn">Start Quiz</button>
//                         </div>
//                     </section>
//                 </div>
//             </div>
//             <div className="popup-info">
//                 <h2>Quiz Guide</h2>
//                 <span className="info">1. Lorem ipsum dolor sit amet consectetur </span>
//                 <span className="info">
//                     2. Lorem ipsum dolor sit amet consectetur adipiscing
//                 </span>
//                 <span className="info">3. Lorem ipsum dolor sit amet cons</span>
//                 <span className="info">
//                     4. Lorem ipsum dolor sit amet consectetur adipiscing
//                 </span>
//                 <span className="info">
//                     5. Lorem ipsum dolor sit amet consectetur adipiscing
//                 </span>

//                 <div className="btn-group">
//                     <button className="info-btn exit-btn">Exit Quiz</button>
//                     <a href="#" className="info-btn continue-btn">
//                         Continue
//                     </a>
//                 </div>
//             </div>
//         </>
//     );
// }





import { useEffect, useState } from "react";
import Header from "../directives/Header";
import axios from "axios";

export default function Home() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [quizCompleted, setQuizCompleted] = useState(false);

    useEffect(() => {
        const startBtn = document.querySelector(".start-btn");
        const popupInfo = document.querySelector(".popup-info");
        const exitBtn = document.querySelector(".exit-btn");
        const main = document.querySelector(".main");
        const continueBtn = document.querySelector(".continue-btn");
        const quizSection = document.querySelector(".quiz-section");
        const quizBox = document.querySelector(".quiz-box");

        getData();

        if (startBtn && popupInfo && main) {
            startBtn.onclick = () => {
                popupInfo.classList.add("active");
                main.classList.add("active");
            };
        }

        if (exitBtn && popupInfo && main) {
            exitBtn.onclick = () => {
                popupInfo.classList.remove("active");
                main.classList.remove("active");
            };
        }

        if (continueBtn && quizSection && popupInfo && main && quizBox) {
            continueBtn.onclick = () => {
                quizSection.classList.add("active");
                popupInfo.classList.remove("active");
                main.classList.remove("active");
                quizBox.classList.add("active");
            };
        }

        return () => {
            if (startBtn) startBtn.onclick = null;
            if (exitBtn) exitBtn.onclick = null;
            if (continueBtn) continueBtn.onclick = null;
        };
    }, []);

    const getData = async () => {
        try {
            const response = await axios.get('https://thingproxy.freeboard.io/fetch/https://api.jsonserve.com/Uw5CrX');
            setQuestions(response.data.questions);
        } catch (error) {
            console.log(error);
        }
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        if (option.is_correct) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        if (selectedOption) {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOption(null);
            } else {
                setQuizCompleted(true);
            }
        }
    };

    const handleRetryQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedOption(null);
        setQuizCompleted(false);
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <>
            <div className="main">
                <Header />
                <div className="containers">
                    <section className="quiz-section">
                        <div className="quiz-box">
                            <h1>Quiz</h1>
                            {!quizCompleted ? (
                                <>
                                    <div className="quiz-header">
                                        <span>{currentQuestion?.topic || "Quiz"}</span>
                                        <span className="header-score">Score: {score} / {questions.length}</span>
                                    </div>
                                    {currentQuestion && (
                                        <>
                                            <h2 className="question-text">{currentQuestion.description}</h2>
                                            <div className="option-list">
                                                {currentQuestion.options.map((option, index) => (
                                                    <div 
                                                        key={option.id}
                                                        className={`option ${selectedOption?.id === option.id ? 
                                                            (option.is_correct ? 'correct' : 'incorrect') : ''}`}
                                                        onClick={() => !selectedOption && handleOptionSelect(option)}
                                                    >
                                                        <span>{option.description}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="quiz-footer">
                                                <span className="question-total">
                                                    {currentQuestionIndex + 1} of {questions.length} Questions
                                                </span>
                                                <button 
                                                    className="next-btn"
                                                    disabled={!selectedOption}
                                                    onClick={handleNextQuestion}
                                                >
                                                    {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <div className="result-box">
                                    <h2>Quiz Completed!</h2>
                                    <p>Your Score: {score} out of {questions.length}</p>
                                    <p>Percentage: {((score / questions.length) * 100).toFixed(2)}%</p>
                                    <button 
                                        className="retry-btn"
                                        onClick={handleRetryQuiz}
                                    >
                                        Retry Quiz
                                    </button>
                                    <button 
                                        className="home-btn"
                                        onClick={() => {
                                            handleRetryQuiz();
                                            document.querySelector(".quiz-section").classList.remove("active");
                                            document.querySelector(".quiz-box").classList.remove("active");
                                        }}
                                    >
                                        Go To Home
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>
                    <section className="home">
                        <div className="home-content">
                            <h1>Quiz Website</h1>
                            <p>Test your knowledge with our interactive quiz!</p>
                            <button className="start-btn">Start Quiz</button>
                        </div>
                    </section>
                </div>
            </div>
            <div className="popup-info">
                <h2>Quiz Guide</h2>
                <span className="info">1. Choose your answer from the options given</span>
                <span className="info">2. Click Next after selecting your answer</span>
                <span className="info">3. Your score will be calculated based on correct answers</span>
                <span className="info">4. You can't change your answer once selected</span>
                <span className="info">5. You can't skip questions</span>

                <div className="btn-group">
                    <button className="info-btn exit-btn">Exit Quiz</button>
                    <a href="#" className="info-btn continue-btn">
                        Continue
                    </a>
                </div>
            </div>
        </>
    );
}




