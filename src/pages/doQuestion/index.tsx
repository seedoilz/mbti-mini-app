import Taro from "@tarojs/taro";
import {useEffect, useState} from "react";
import {View} from "@tarojs/components";
import {AtButton, AtRadio} from "taro-ui";
import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.scss";
import GlobalFooter from "../../components/GlobalFooter";
import questions from "../../data/questions.json";

/**
 * 答题页面
 */
export default () => {
  // 当前题目序号从1开始
  const [current, setCurrent] = useState<number>(1);

  // 当前题目
  const [currentQuestion, setCurrentQuestion] = useState(questions[0])
  const questionOptions = currentQuestion.options.map((option) => {
    return {label: `${option.key}. ${option.value}`, value: option.key};
  });
  // 当前答案
  const [currentAnswer, setCurrentAnswer] = useState<string>();
  // 回答列表
  const [answerList] = useState<string[]>([]);

  useEffect(() => {
    setCurrentQuestion(questions[current - 1]);
    setCurrentAnswer(answerList[current - 1])
  })

  return (
    <View className='doQuestionPage'>
      <View className='at-article__h1 title'>
        {current}, {currentQuestion.title}
      </View>
      <AtRadio
        value={currentAnswer}
        options={questionOptions}
        onClick={(value) => {
          setCurrentAnswer(value)
          answerList[current - 1] = value
        }}
      />
      {current < questions.length && (
        <AtButton
          type='primary'
          className='controlBtn'
          circle
          disabled={!currentAnswer}
          onClick={() => {
            setCurrent(current + 1)
          }}
        >
          下一题
        </AtButton>
      )}
      {current == questions.length && (
        <AtButton
          type='primary'
          circle
          className='controlBtn'
          disabled={!currentAnswer}
          onClick={() => {
            // 传递答案
            Taro.setStorageSync("answerList", answerList);
            // 跳转到结果页面
            Taro.navigateTo({
              url: "/pages/result/index",
            });
          }}
        >
          查看结果
        </AtButton>
      )}
      {(current > 1) && (
        <AtButton
          type='secondary'
          className='controlBtn'
          circle
          onClick={() => {
            setCurrent(current - 1)
          }}
        >
          上一题
        </AtButton>)
      }
      <GlobalFooter />
    </View>
  );
};
