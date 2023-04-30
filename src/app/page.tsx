"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat, Roboto_Slab } from "next/font/google";
import clsx from "clsx";
// import { history } from "@/data/history.js";
import MessageIcon from "@/assets/message.svg";
import GearIcon from "@/assets/gear.svg";
import SendIcon from "@/assets/send.svg";
import UserIcon from "@/assets/user.svg";
import CompassIcon from "@/assets/compass.svg";
import { useEffect, useRef, useState } from "react";

const montserrat = Montserrat({ subsets: ["latin"] });
const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

const dummy =
  "Ut porttitor risus nisl, at cursus arcu venenatis sed. Aliquam a pretium neque. Cras non consequat turpis. Suspendisse vel pulvinar est, ac mollis neque. Proin pretium, nibh ut porta tincidunt, turpis turpis scelerisque est, quis auctor nulla arcu ac metus. Quisque id felis velit. Integer pharetra, est quis imperdiet porttitor, libero risus tempus turpis, ac euismod leo ex ut tellus. Integer pulvinar auctor lacus eu ornare";

type chatListEntry = {
  question: string;
  answer: string;
};

type session = {
  _id: string;
  chatList: chatListEntry[];
};

export default function Home() {
  const [isKMP, setKMP] = useState<boolean>(true);
  const [chat, setChat] = useState<string[]>([]);
  const [currInput, setCurrInput] = useState<string>("");
  const [currId, setCurrId] = useState<string>("");

  const contentArea = useRef<HTMLDivElement>(null);
  const inputContainer = useRef<HTMLDivElement>(null);
  const inputField = useRef<HTMLTextAreaElement>(null);

  const [sessionList, setSessionList] = useState<session[]>([]);
  useEffect(() => {
    async function getAllSession() {
      try {
        const response = await fetch("http://localhost:5000/session");
        const data = await response.json();
        console.log(data.message);

        return data.message;
      } catch (err) {
        console.log(err);
      }
    }

    async function createNewHistory() {
      try {
        const response = await fetch("http://localhost:5000/session", {
          method: "POST",
        });
        const data = await response.json();
        console.log(data.message);

        await getAllSession().then((data) => setSessionList(data));
        return data.message;
      } catch (err) {
        console.log(err);
      }
    }

    createNewHistory().then((data) => setCurrId(data));
  }, []);

  const saveHistory = async (chat: string[]) => {
    try {
      const response = await fetch("http://localhost:5000/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: currId,
          question: chat[chat.length - 2],
          response: chat[chat.length - 1],
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    setChat((prevChat) => [...prevChat, currInput]);

    if (contentArea.current) {
      contentArea.current.scrollTop = contentArea.current.scrollHeight;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    for (let i = 0; i < dummy.length; i++) {
      if (contentArea.current) {
        contentArea.current.scrollTop = contentArea.current.scrollHeight;
      }

      if (i == 0) {
        setChat((prevChat) => [...prevChat, dummy.slice(0, 1)]);
      } else if (i === dummy.length - 1) {
        setChat((prevChat) => {
          const newChat = [
            ...prevChat.slice(0, prevChat.length - 1),
            dummy.slice(0, i),
          ];
          saveHistory(newChat);
          return newChat;
        });
      } else {
        setChat((prevChat) => [
          ...prevChat.slice(0, prevChat.length - 1),
          dummy.slice(0, i),
        ]);
      }
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  };

  return (
    <div className="flex">
      <aside className="w-[24vw] bg-GREEN-600 h-[100vh] flex flex-col items-center justify-between border-r-2 border-black">
        <div className="flex flex-col items-center overflow-auto w-full pb-6">
          <h1
            className={clsx(
              "text-white uppercase text-4xl mt-12 mb-6 tracking-[0.07em] font-black",
              robotoSlab.className
            )}
          >
            ChatGPS
          </h1>
          <ul className="overflow-auto py-3 w-full flex flex-col items-center">
            {sessionList?.map(({ chatList }, idx) => (
              <button
                key={idx}
                className="w-[277px] h-[47px] flex items-center px-4 bg-GREEN-200 rounded-[10px] mt-6 first:mt-0 shadow-history cursor-pointer flex-none hover:shadow-slate-600"
              >
                <Image src={MessageIcon} width={16} height={16} alt="" />
                <p className={clsx("ml-4 text-xs", montserrat.className)}>
                  {chatList[0] ? chatList[0].question : "Empty Chat"}
                </p>
              </button>
            ))}
          </ul>
        </div>

        <div className="w-full bg-GREEN-600 pb-4">
          <button
            onClick={() => setKMP(true)}
            className={clsx(
              "px-5 flex items-center h-[74px] w-full relative",
              isKMP
                ? "before:shadow-algo-highlight before:absolute before:w-full before:h-[100%] before:left-0 before:top-0 bg-GREEN-400 z-10"
                : "bg-white hover:bg-GREY"
            )}
          >
            <Image
              src={GearIcon}
              width={24}
              height={19}
              alt=""
              style={{ opacity: isKMP ? 1 : 0 }}
            />
            <p className={clsx("font-bold text-xl ml-6", robotoSlab.className)}>
              Knuth-Morris-Pratt
            </p>
          </button>
          <button
            onClick={() => setKMP(false)}
            className={clsx(
              "px-5 flex items-center h-[74px] w-full relative",
              !isKMP
                ? "bg-GREEN-400 before:shadow-algo-highlight before:absolute before:w-full before:h-[100%] before:left-0 before:top-0 z-10"
                : "bg-white hover:bg-GREY"
            )}
          >
            <Image
              src={GearIcon}
              width={24}
              height={19}
              alt=""
              style={{ opacity: !isKMP ? 1 : 0 }}
            />
            <p className={clsx("font-bold text-xl ml-6", robotoSlab.className)}>
              Boyer-Moore
            </p>
          </button>

          <div className="flex gap-4 mx-auto justify-between w-fit pt-5">
            <Link
              className={clsx(
                "font-bold text-[10px] text-white hover:text-GREEN-400",
                montserrat.className
              )}
              href={"/"}
            >
              NerbFox
            </Link>
            <Link
              className={clsx(
                "font-bold text-[10px] text-white hover:text-GREEN-400",
                montserrat.className
              )}
              href={"/"}
            >
              arieljovananda88
            </Link>
            <Link
              className={clsx(
                "font-bold text-[10px] text-white hover:text-GREEN-400",
                montserrat.className
              )}
              href={"/"}
            >
              RMA1403
            </Link>
          </div>
        </div>
      </aside>

      <main className="h-[100vh] bg-white w-[76vw] flex flex-col justify-between">
        <div ref={contentArea} className="w-full h-[78.6vh] overflow-auto pt-6">
          {chat.map((item, idx) => (
            <div
              key={idx}
              className={clsx(
                "w-full py-9 px-12 flex items-start",
                idx % 2 === 0 ? "bg-white" : "bg-green-100"
              )}
            >
              <Image
                src={idx % 2 === 0 ? UserIcon : CompassIcon}
                width={idx % 2 === 0 ? 20 : 24}
                height={idx % 2 === 0 ? 20 : 24}
                alt=""
              />
              <p className={clsx(idx % 2 === 0 ? "ml-9" : "ml-8")}>{item}</p>
            </div>
          ))}
        </div>

        <div className="w-full h-[154px] bg-white relative px-12">
          <div
            ref={inputContainer}
            className="w-[68vw] h-[49px] bg-fuchsia-200 shadow-text-field rounded-lg absolute bottom-12"
          >
            <textarea
              ref={inputField}
              value={currInput}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setCurrInput(e.target.value);
              }}
              className={clsx(
                "rounded-lg h-[49px] w-full max-h-[72px] focus:outline-none py-4 pl-6 pr-16 text-sm resize-none",
                montserrat.className
              )}
            />
            <button onClick={handleSubmit} className="absolute right-6 top-4">
              <Image src={SendIcon} width={20} height={20} alt="" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
