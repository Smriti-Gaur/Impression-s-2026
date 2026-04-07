import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Mousewheel, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';


const clubsDatabase = {
  "1": { 
    clubName: "JYC", category: "Cultural", insta: "https://www.instagram.com/jiityouthclub/",
    description: "JIIT Youth Club (JYC) is the central student body dedicated to fostering holistic development, creativity, and teamwork. It provides a vibrant platform for cultural, technical, and extracurricular activities, offering students a refreshing break from academics while building confidence and a strong sense of belonging.",
    events: [
      { id: '101', title: "Bridge Wars", description: "In this event, participants will be divided into teams and given popsicle sticks and basic materials. They have to design and build a bridge within the given time. At the end, weights will be placed on the bridge, and it should be strong enough to hold them without collapsing.", rules: ["Team Size: 3 to 4 members.", "Time Limit: Teams must complete the bridge within 1 hour; delays may lead to penalties or disqualification.", "Teams have full freedom to design their bridge using the provided materials.", "Judging Criteria: Points awarded based on time efficiency, design & creativity, and weight test performance."], coordinators: [{ name: "Aditya Singh", phone: "9910950850" }, { name: "Anika Tomar", phone: "8130025925" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLScPy1ud7xmaWAP6-RXdVoS2HQIXzjCsg8eIcrYzGKliK3glVQ/viewform?usp=publish-editor" },
      { id: '102', title: "Human Bingo", description: "Participants will compete in teams of 4–5 members. They will receive a bingo sheet with different tasks and have to interact with others to complete them. The team that completes the maximum tasks correctly wins.", rules: ["Teams of 4-5 members only.", "Participants must interact to complete tasks on the bingo sheet."], coordinators: [{ name: "Harsh Agarwal", phone: "6261614692" }, { name: "Anika Tomar", phone: "8130025925" }], gformLink: "" },
      { id: '103', title: "Instant Influencer", description: "Participants will be given a theme and asked to create a short video using their phones. They have to plan, shoot, and present their content within the given time.", rules: ["Team size: each team must consist of 4-5 members.", "Time limit: Team must complete shooting and editing within 25-30 mins.", "Judging criteria: the best among 3 groups will be judged by fellow participants, final 3 reels will be judged by organizers."], coordinators: [{ name: "Itahisha Singh", phone: "6360061314" }, { name: "Keshav Agarwal", phone: "9140281823" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLScPy1ud7xmaWAP6-RXdVoS2HQIXzjCsg8eIcrYzGKliK3glVQ/viewform?usp=publish-editor" },
      { id: '104', title: "Skill Issue", description: "Participants will perform individually or in pairs to showcase their worst talent in a fun and entertaining way (singing, poetry, comedy).", rules: ["Solo or duo participation.", "Time limit: 3-5 minutes.", "Judging criteria: uniqueness of the idea and voting/hooting by the audience."], coordinators: [{ name: "Misthi Agarwal", phone: "9406506101" }, { name: "Anunaya Phatak", phone: "7307564292" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLScPy1ud7xmaWAP6-RXdVoS2HQIXzjCsg8eIcrYzGKliK3glVQ/viewform?usp=publish-editor" },
      { id: '105', title: "Quiz", description: "Participants will compete in a quiz with multiple rounds such as MCQs and rapid-fire questions.", rules: [], coordinators: [{ name: "Keshav Agarwal", phone: "8791312187" }, { name: "Shivom", phone: "7668528408" }, { name: "Kartikey Rai", phone: "8756459152" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLScPy1ud7xmaWAP6-RXdVoS2HQIXzjCsg8eIcrYzGKliK3glVQ/viewform?usp=publish-editor" },
      { id: '106', title: "Box Of Secrets", description: "Participants will go through different phases of a guessing-based game. They will be given clues, objects, or situations to guess correctly.", rules: ["Individual event.", "Time Limit: Fixed time for each round; exceeding leads to penalties.", "Round 1: Identify objects by touch without peeking.", "Round 2: Replicate a 4-can arrangement without seeing it. 6 chances given.", "No external help or hints are allowed."], coordinators: [{ name: "Kishika Gupta", phone: "9318342184" }, { name: "Alice Agarwal", phone: "8279806597" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLScPy1ud7xmaWAP6-RXdVoS2HQIXzjCsg8eIcrYzGKliK3glVQ/viewform?usp=publish-editor" },
      { id: '107', title: "Mystery Game", description: "The description will be disclosed at the time of the event.", rules: ["Individual event conducted in multiple rounds.", "All rules, rounds, and instructions will be disclosed at the time of the event.", "Participants must follow all instructions and maintain proper conduct.", "Any form of cheating leads to disqualification."], coordinators: [{ name: "Tanushree Jain", phone: "9982116661" }, { name: "Satwik Agarwal", phone: "9528155101" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLScPy1ud7xmaWAP6-RXdVoS2HQIXzjCsg8eIcrYzGKliK3glVQ/viewform?usp=publish-editor" }
    ]
  },
  "2": { 
    clubName: "IEEE", category: "Technical", insta: "https://www.instagram.com/ieeesbjiit/",
    description: "A globally recognized technical body that connects students with industry standards and innovations. It provides exposure through workshops, seminars, and networking opportunities.",
    events: [
      { id: '201', title: "Carnival Chronicles 2.0", description: "Participants will be given a set of tasks which they need to complete within limited time (15 minutes) with the help of Al tools in order to escape the maze and find the thief.", rules: ["Time limit is strictly 15 minutes.", "Participants must use AI tools to escape the maze.", "Finding the thief completes the challenge."], coordinators: [{ name: "Manayav Vatsal", phone: "7905071036" }, { name: "Anoushka Kaushik", phone: "9953193922" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfgZp2ymgfULM_W0je5-NYHZfsr0BIhYjsLIt4V8IsNLyiUNQ/viewform?usp=publish-editor" },
      { id: '202', title: "The Great College Heist 2.0", description: "The Great College Heist is a fast-paced puzzle event that tests participants’ problem-solving skills, speed, and teamwork. Teams solve a sequence of challenges where each solved task unlocks the next.", rules: ["15 sequential challenges to be solved in 1 hour.", "Challenges are hosted on the RTFD platform.", "Points decrease as time goes on. Hints cost points.", "Top three fastest teams win."], coordinators: [{ name: "Manayav Vatsal", phone: "7905071036" }, { name: "Anoushka Kaushik", phone: "9953193922" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfgZp2ymgfULM_W0je5-NYHZfsr0BIhYjsLIt4V8IsNLyiUNQ/viewform?usp=publish-editor" }
    ]
  },
  "3": { 
    clubName: "Crescendo", category: "Performing Arts", insta: "https://www.instagram.com/crescendojiit/",
    description: "A premier music hub designed to be the ultimate intersection of sound, technology, and community.",
    events: [
      { id: '301', title: "Battle of Bands", description: "An electrifying competition where college bands battle it out on stage with powerful performances, original compositions, and musical creativity.", rules: ["Online preliminary round requires an unedited, continuous 3-minute video submission.", "Finalists get 10 minutes of stage time including soundcheck.", "Minimum 3 and maximum 8 members on stage.", "Any language or genre is allowed. Vulgarity leads to immediate disqualification."], coordinators: [{ name: "Yash Gupta", phone: "7302092490" }, { name: "Eeshan Gupta", phone: "9910423923" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfW-U0x1WGm2ZzVJbV8Q5AAtEm-vD3topIAwusgUo8Ptj8gtg/viewform?usp=publish-editor" },
      { id: '302', title: "Solo Singing Competition", description: "A platform for individual vocalists to showcase their talent and passion for music.", rules: ["Online prelims: Unedited, continuous 2-minute video submission.", "Finalists get 5 minutes on stage including sound check.", "Maximum 2 accompanying instrumentalists allowed.", "Backing tracks allowed but must not overpower the singer.", "Judgment will be based exclusively on singing ability."], coordinators: [{ name: "Pakhi Shukla", phone: "8527795234" }, { name: "Saina Kohli", phone: "9899863735" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfW-U0x1WGm2ZzVJbV8Q5AAtEm-vD3topIAwusgUo8Ptj8gtg/viewform?usp=publish-editor" }
    ]
  },
  "4": { 
    clubName: "Jhankaar", category: "Performing Arts", insta: "https://www.instagram.com/jhankaarjiit/",
    description: "A premier dance hub dedicated to the celebration of movement, grace, and cultural expression.",
    events: [
      { id: '401', title: "Group Dance Competition", description: "A competitive category where different dance troupes or teams compete against each other by presenting a choreographed performance.", rules: [], coordinators: [{ name: "Vijaya Singh", phone: "9559122050" }, { name: "Yuvraj Chhabra", phone: "9729344000" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfW-U0x1WGm2ZzVJbV8Q5AAtEm-vD3topIAwusgUo8Ptj8gtg/viewform?usp=publish-editor" },
      { id: '402', title: "Solo (On The Spot)", description: "Solo dancers will improvise their moves to music played on the spot, testing their spontaneity.", rules: [], coordinators: [{ name: "Vijaya Singh", phone: "9559122050" }, { name: "Yuvraj Chhabra", phone: "9729344000" }], gformLink: "" },
      { id: '403', title: "Duet Dance Competition", description: "Duo performances focusing on synchronization, chemistry, formations, and expressive choreography.", rules: [], coordinators: [{ name: "Vijaya Singh", phone: "9559122050" }, { name: "Yuvraj Chhabra", phone: "9729344000" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfW-U0x1WGm2ZzVJbV8Q5AAtEm-vD3topIAwusgUo8Ptj8gtg/viewform?usp=publish-editor" },
      { id: '404', title: "Solo Dance Competition", description: "Solo (prepared) performances focusing on expressive choreography.", rules: [], coordinators: [{ name: "Vijaya Singh", phone: "9559122050" }, { name: "Yuvraj Chhabra", phone: "9729344000" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfW-U0x1WGm2ZzVJbV8Q5AAtEm-vD3topIAwusgUo8Ptj8gtg/viewform?usp=publish-editor" }
    ]
  },
  "5": { 
    clubName: "The Thespian Circle", category: "Performing Arts", insta: "https://www.instagram.com/thethespiancircle/",
    description: "A theatre-based society that promotes acting, stagecraft, and storytelling. It provides a platform for artistic expression through plays, performances, and dramatics events.",
    events: [
      { id: '501', title: "Group Act Competition (Tamasha)", description: "A theatrical event where a team performs a scripted play or skit.", rules: ["Team Size: 2-5 participants (no solo entries).", "Duration: 5-10 minutes. Exceeding limits may lead to disqualification.", "No vulgar, obscene, offensive, or controversial content.", "Props allowed but self-managed. Spillage must be cleaned."], coordinators: [{ name: "Mukund", phone: "9289412226" }, { name: "Yuvraj", phone: "8840412961" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfW-U0x1WGm2ZzVJbV8Q5AAtEm-vD3topIAwusgUo8Ptj8gtg/viewform?usp=publish-editor" },
      { id: '502', title: "Talent Con", description: "A competition where participants can showcase their talent in fields like monoacts, mime, beatbox, storytelling, poetry, etc.", rules: ["Participation: Solo performance only.", "Duration: 3-7 minutes.", "Open format (monoact, stand-up, poetry, etc.).", "No vulgar, obscene, or offensive content."], coordinators: [{ name: "Saara", phone: "7417793044" }, { name: "Mukund", phone: "9289412226" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfW-U0x1WGm2ZzVJbV8Q5AAtEm-vD3topIAwusgUo8Ptj8gtg/viewform?usp=publish-editor" }
    ]
  },
  "6": { 
    clubName: "Finanza", category: "JBS", insta: "https://www.instagram.com/finanza.jbs/",
    description: "A hub for finance enthusiasts that explores investment strategies, financial markets, and economic trends.",
    events: [
      { id: '601', title: "Island Escape", description: "Bringing the Tropical Summer Beach Vibes to life, this event blends fun, adventure, and strategy into an exciting challenge.", rules: ["Teams of 2-3 members. 15 minutes total time for Round 1.", "Find hidden bottles across campus containing clues/tasks.", "Must post a story on Finanza Instagram handles as proof.", "Round 2: Only one member allowed on the pitch grid.", "No physical damage to hiding spots, no sabotage, and no internet searching."], coordinators: [{ name: "Anushka Tomar", phone: "8287583131" }, { name: "Shruti Mehra", phone: "7011732746" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfCV3yOzGnsNFwNpUCLQPVhUbTyedmR9eOillp5_aVsCnSvDw/viewform?usp=publish-editor" }
    ]
  },
  "7": { 
    clubName: "Radiance", category: "Performing Arts", insta: "https://www.instagram.com/radiance.hub/",
    description: "A hub dedicated to fashion, styling, and creative expression. It organizes runway shows and fashion events, encouraging innovation in design.",
    events: [
      { id: '701', title: "Mr. & Miss Impressions", description: "JIIT's annual pageant. A campus-wide talent and beauty contest wherein participants will be assessed on their personality and performance.", rules: [], coordinators: [{ name: "Yash Negi", phone: "8448117150" }, { name: "Soumya Pandey", phone: "8853794512" }], gformLink: "", registrationClosed: true }
    ]
  },
  "8": { 
    clubName: "RIBOSE", category: "Technical", insta: "https://www.instagram.com/ribose.jiit/",
    description: "A cutting-edge technical hub where biology meets logic and innovation. A hub dedicated to biotechnology that fosters research, experimentation, and innovation.",
    events: [
      { id: '801', title: "The Island Helix", description: "A fun puzzle-based event where participants decode a hidden message using the DNA bases A, T, G, and C.", rules: ["Participants must decode and arrange nucleotide sequences using color code.", "Clues and hints will be provided at different rounds.", "Each round has a time limit.", "Points are based on accuracy and speed."], coordinators: [{ name: "Ishtika Chauhan", phone: "7701901559" }, { name: "Sanvi Butta", phone: "9871208849" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfgZp2ymgfULM_W0je5-NYHZfsr0BIhYjsLIt4V8IsNLyiUNQ/viewform?usp=publish-editor" },
      { id: '802', title: "Tropical Trail", description: "An exciting three-station challenge where participants test their observation, thinking, and teamwork skills.", rules: ["Teams of 2 participants.", "3 stations with increasing difficulty to solve puzzles.", "Teams must complete each station to move ahead."], coordinators: [{ name: "Vijaya Lakshmi Sista", phone: "9911699122" }, { name: "Naina Yadav", phone: "8800137223" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfgZp2ymgfULM_W0je5-NYHZfsr0BIhYjsLIt4V8IsNLyiUNQ/viewform?usp=publish-editor" }
    ]
  },
  "9": { 
    clubName: "Kalakriti", category: "Visual Arts", insta: "https://www.instagram.com/kalakriti.jiit/",
    description: "A platform for artistic expression through painting, sketching, and craft. It encourages creativity and innovation in visual arts.",
    events: [
      { id: '901', title: "Design by Heart", description: "A creative fashion-art event where participants will transform plain clothing items into unique pieces of art.", rules: ["Participants must bring their own plain clothing item.", "Decorative materials provided by the hub.", "Theme: Tropical Beats.", "Time limit: 60-90 minutes.", "Design must be created on the spot; no pre-made designs allowed.", "Mobile phones allowed for reference."], coordinators: [{ name: "Bristi Biswas", phone: "8377860382" }, { name: "Naina Yadav", phone: "8800137223" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfCV3yOzGnsNFwNpUCLQPVhUbTyedmR9eOillp5_aVsCnSvDw/viewform?usp=publish-editor" }
    ]
  },
  "10": { 
    clubName: "JPEG", category: "Visual Arts", insta: "https://www.instagram.com/jaypee.photo.enthusiasts.guild/",
    description: "A creative hub for photography and visual storytelling. It helps students develop skills in capturing moments, editing, and expressing ideas through visuals.",
    events: [
      { id: '1001', title: "Wall Of Frames", description: "Photo wall exhibition, exhibiting the photographs submitted with voting for the best picture exhibited.", rules: ["No plagiarism is allowed.", "Submit both raw and edited images.", "No logos or watermarks are allowed.", "No alterations using Photoshop."], coordinators: [{ name: "Nandini Verma", phone: "9810649311" }, { name: "Saransh Mathur", phone: "9599468124" }, { name: "Anoushka Kaushik", phone: "9953193922" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfCV3yOzGnsNFwNpUCLQPVhUbTyedmR9eOillp5_aVsCnSvDw/viewform?usp=publish-editor" },
      { id: '1002', title: "Tasveer", description: "Online photograph submission competition.", rules: ["Upload original photograph adhering strictly to the contest theme.", "Photo should be unedited and raw.", "No logos accepted on the photograph."], coordinators: [{ name: "Jai Rana", phone: "8533833802" }, { name: "Nimisha Sharma", phone: "9424484426" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfCV3yOzGnsNFwNpUCLQPVhUbTyedmR9eOillp5_aVsCnSvDw/viewform?usp=publish-editor" }
    ]
  },
  "11": { 
    clubName: "SILICA", category: "Technical", insta: "https://www.instagram.com/silica_jiit/",
    description: "Focused on semiconductor technologies and chip design, this hub promotes knowledge in electronics and hardware systems.",
    events: [
      { id: '1101', title: "Pitch Up", description: "Students develop a brand concept and business model for a given idea within 15–20 minutes and pitch it.", rules: ["Teams of 2-3 members only.", "Submit one original startup idea and prepare a pitch deck.", "Time limit will be strictly enforced.", "Plagiarised ideas will be disqualified."], coordinators: [{ name: "Ruchit Khandelwal", phone: "9719465888" }, { name: "Maitreya Agarwal", phone: "TBA" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfgZp2ymgfULM_W0je5-NYHZfsr0BIhYjsLIt4V8IsNLyiUNQ/viewform?usp=publish-editor" },
      { id: '1102', title: "MindStorm", description: "An interactive competition for electronics enthusiasts. Challenges include quizzes and troubleshooting digital logic circuits.", rules: ["Teams of 1-3 members only.", "No phones, smartwatches, or external devices allowed.", "No communication outside your team during the event.", "Answers cannot be changed once submitted."], coordinators: [{ name: "Shubham Jha", phone: "8709304575" }, { name: "Maitreya Agarwal", phone: "TBA" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfgZp2ymgfULM_W0je5-NYHZfsr0BIhYjsLIt4V8IsNLyiUNQ/viewform?usp=publish-editor" }
    ]
  },
  "12": { 
    clubName: "GIWM", category: "Misc", insta: "https://www.instagram.com/giwm_jiit/",
    description: "Focused on sustainability, this hub works towards environmental awareness and responsible waste management through various initiatives.",
    events: [
      { id: '1201', title: "QuestX", description: "The Ultimate Campus Challenge is a thrilling three-round team event designed to test participants’ intelligence, speed, and teamwork.", rules: ["Teams of 2-4 participants.", "Valid college ID cards are required.", "At least one smartphone per team is mandatory for tasks.", "Round 1: Menti Quiz (Elimination).", "Round 2: Campus Scavenger Hunt with photo/video proofs.", "No damage to campus property."], coordinators: [{ name: "Tanmay Bindal", phone: "7536057826" }, { name: "Raghvendra Singh Shaktawat", phone: "6375941680" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfCV3yOzGnsNFwNpUCLQPVhUbTyedmR9eOillp5_aVsCnSvDw/viewform?usp=publish-editor" }
    ]
  },
  "13": { 
    clubName: "DICE", category: "Technical", insta: "https://www.instagram.com/dice.jiit/",
    description: "A data-driven hub that explores analytics, machine learning, and computational technologies. It equips students with skills to derive insights and solve complex real-world problems.",
    events: [
      { id: '1301', title: "Reverse Reality", description: "Decode the Intelligence - ReverseQuest is a high-intensity competitive challenge to reverse-engineer hidden AI systems.", rules: ["Individual or teams of 2-4 members.", "Conducted on a web-based platform; no sharing credentials.", "Focus on AI prompt engineering and logical deduction, not traditional hacking.", "No automated bots/scripts to brute force answers."], coordinators: [{ name: "Mishita Joshi", phone: "7625923537" }, { name: "Priya Singh", phone: "8433102577" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfgZp2ymgfULM_W0je5-NYHZfsr0BIhYjsLIt4V8IsNLyiUNQ/viewform?usp=publish-editor" },
      { id: '1302', title: "Tropicrypt", description: "A fast-paced, team-based technical challenge where participants 'escape' a virtual system by solving cryptography puzzles.", rules: ["Teams of 2-3 members.", "Solve using cryptographic techniques, pattern analysis, and logical deduction.", "No sharing keys, hints, or using automated brute-force tools.", "Faster completion times used as tie-breakers."], coordinators: [{ name: "Mishita Joshi", phone: "7625923537" }, { name: "Priya Singh", phone: "8433102577" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfgZp2ymgfULM_W0je5-NYHZfsr0BIhYjsLIt4V8IsNLyiUNQ/viewform?usp=publish-editor" }
    ]
  },
  "14": { 
    clubName: "Economics & Business", category: "JBS", insta: "https://www.instagram.com/jiit_economicsandbusinesshub/",
    description: "A hub that bridges academic concepts with real-world economic and business practices. It promotes analytical thinking and entrepreneurial skills.",
    events: [
      { id: '1401', title: "Travelogue", description: "A global strategic simulation where teams act as travel agencies and design a comprehensive international travel strategy.", rules: ["Teams of 1-4 members.", "Travel plan must be hand-drawn on the provided chart.", "2 hours for preparation.", "5-7 minutes for presentation to the judging panel.", "Evaluated on feasibility, currency accuracy, and cultural sensitivity."], coordinators: [{ name: "Natansh Singh", phone: "9667328886" }, { name: "T. Lavanya Rajyashree", phone: "8368324697" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfCV3yOzGnsNFwNpUCLQPVhUbTyedmR9eOillp5_aVsCnSvDw/viewform?usp=publish-editor" }
    ]
  },
  "15": { 
    clubName: "Game Dev", category: "Technical", insta: "https://www.instagram.com/gamedev_jiit/",
    description: "A creative platform for students interested in designing, developing, and publishing games.",
    events: [
      { id: '1501', title: "The Hollow Escape", description: "The game is developed by the game development hub itself where the students will compete with each other for the lowest completion time.", rules: ["Individual participation.", "Complete the game in minimum time.", "No mid-run restarts.", "No external help/tools allowed."], coordinators: [{ name: "Chitransh Saxena", phone: "7014120076" }, { name: "Mayank Varshney", phone: "8077302885" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfgZp2ymgfULM_W0je5-NYHZfsr0BIhYjsLIt4V8IsNLyiUNQ/viewform?usp=publish-editor" },
      { id: '1502', title: "PS Game Fest", description: "Setup of two PS5s where students will compete among themselves on different games (1v1 Kick-Off).", rules: ["Individual participation (1v1 knockout).", "Half length: 4-6 minutes.", "Difficulty: World Class.", "Default squads only; no custom squads."], coordinators: [{ name: "Chitransh Saxena", phone: "7014120076" }, { name: "Mayank Varshney", phone: "8077302885" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfgZp2ymgfULM_W0je5-NYHZfsr0BIhYjsLIt4V8IsNLyiUNQ/viewform?usp=publish-editor" }
    ]
  },
  "16": { 
    clubName: "Consultancy Club", category: "JBS", insta: "https://www.instagram.com/theconsultingclubofjbs?igsh=MTE1YzJzbGJta3h5ZA==",
    description: "Develops problem-solving and analytical skills by engaging students in real-world business challenges and case studies.",
    events: [
      { id: '1601', title: "Brandscript Ai", description: "Utilizing AI to generate compelling brand narratives in an on-the-spot branding challenge.", rules: ["Maximum team size of 5 members.", "No prior preparation; brands assigned randomly.", "Submit a max 60-second video via official portal by 2:30 PM.", "Mandatory use of AI tools, but storytelling must be unique to the team."], coordinators: [{ name: "Jignesh Giri", phone: "9899688762" }, { name: "Sambit Chakraborty", phone: "7003510856" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfCV3yOzGnsNFwNpUCLQPVhUbTyedmR9eOillp5_aVsCnSvDw/viewform?usp=publish-editor" }
    ]
  },
  "17": { 
    clubName: "Expressions", category: "Visual Arts", insta: "https://www.instagram.com/expressions.jiit?igsh=M3YxdDMzZzQ2NjBi",
    description: "A hub dedicated to the fine arts and creative visual expression.",
    events: [
      { id: '1701', title: "Canvas Conclave", description: "A massive collaborative painting event.", rules: [], coordinators: [], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfCV3yOzGnsNFwNpUCLQPVhUbTyedmR9eOillp5_aVsCnSvDw/viewform?usp=publish-editor" },
      { id: '1702', title: "Trivia Tints", description: "A unique blend of art and trivia.", rules: [], coordinators: [], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfCV3yOzGnsNFwNpUCLQPVhUbTyedmR9eOillp5_aVsCnSvDw/viewform?usp=publish-editor" }
    ]
  },
  "18": { 
    clubName: "KPH", category: "Technical", insta: "https://www.instagram.com/knuth_jiit/",
    description: "Knuth Programming Hub: A competitive programming community aimed at strengthening algorithmic thinking and problem-solving skills.",
    events: [
      { id: '1801', title: "Knuth Cup", description: "An ICPC-style competitive programming contest conducted in an individual format.", rules: ["Individual participation only; no teams.", "Fixed duration with a shared set of algorithmic problems.", "Attempt problems in any order.", "Ranked by solved problems and total time (including penalties)."], coordinators: [{ name: "Yash Gupta", phone: "7302092490" }, { name: "Krishna Gupta", phone: "9414069227" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfgZp2ymgfULM_W0je5-NYHZfsr0BIhYjsLIt4V8IsNLyiUNQ/viewform?usp=publish-editor" },
      { id: '1802', title: "Code Ne Bana Di Jodi", description: "Code Relay is a team-based competitive programming event where participants compete in groups of 3-4.", rules: ["Teams of 3-4 members.", "Relay structure: Only one team member works at a time.", "Next level unlocks only after the correct submission of the current level.", "No skipping or parallel solving."], coordinators: [{ name: "Krishna Gupta", phone: "9414069227" }, { name: "Yash Gupta", phone: "7302092490" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfgZp2ymgfULM_W0je5-NYHZfsr0BIhYjsLIt4V8IsNLyiUNQ/viewform?usp=publish-editor" }
    ]
  },
  "19": { 
    clubName: "DSC", category: "Technical", insta: "https://www.instagram.com/dscjiit/",
    description: "Developers Student Club: A collaborative community of developers and technology enthusiasts that focuses on learning, innovation, and real-world problem solving.",
    events: [
      { id: '1901', title: "Glitchy You or System?", description: "Each team will answer technical questions. Solving quickly grants a 'Glitch Card', failing results in a 'Punishment Card'.", rules: ["Teams of 2-3 members. No individual participation.", "Phones must be submitted before competition starts.", "Main Quiz Phase: 10 minutes for 3 technical questions.", "Bonus/Penalty Phase: Glitch Card (+20 pts) or Punishment Card (+10 pts)."], coordinators: [{ name: "Yash Raj", phone: "9013905981" }, { name: "Uday Gangal", phone: "7042376188" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfgZp2ymgfULM_W0je5-NYHZfsr0BIhYjsLIt4V8IsNLyiUNQ/viewform?usp=publish-editor" },
      { id: '1902', title: "Decode The Drama", description: "Guess the movie from clues, then generate an AI poster based on that movie.", rules: ["Teams of 2-3 members.", "Phones must be submitted before competition starts.", "Round 1: 20 mins to guess the movie (2 guesses max).", "Round 2: 10 mins to generate AI poster using a max of 3 prompts."], coordinators: [{ name: "Yash Raj", phone: "9013905981" }, { name: "Uday Gangal", phone: "7042376188" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfgZp2ymgfULM_W0je5-NYHZfsr0BIhYjsLIt4V8IsNLyiUNQ/viewform?usp=publish-editor" }
    ]
  },
  "20": { 
    clubName: "CICE", category: "Technical", insta: "https://www.instagram.com/cice_jiit/",
    description: "A high-energy technical hub dedicated to the hands-on world of hardware, circuitry, and embedded systems.",
    events: [
      { id: '2001', title: "Escape Room", description: "Teams will get coupons and missions to complete tasks and games designed so that the team to secure the most points wins.", rules: ["Teams of 2-5 members.", "Complete missions and mini-games to earn points.", "Using hints may result in point deductions."], coordinators: [{ name: "Bhavy Sharma", phone: "7427040653" }, { name: "Kashish", phone: "8287913564" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfgZp2ymgfULM_W0je5-NYHZfsr0BIhYjsLIt4V8IsNLyiUNQ/viewform?usp=publish-editor" },
      { id: '2002', title: "Electric Tambola", description: "Tambola circuit will be designed on a breadboard. Correctly identify numbers called and activate the corresponding LED.", rules: ["Maximum of 2 members per team.", "Host calls a random number; team must identify and turn ON the assigned LED.", "Incorrect LEDs result in warning or disqualification.", "Do not tamper with other setups."], coordinators: [{ name: "Bhavy Sharma", phone: "7427040653" }, { name: "Kashish", phone: "8287913564" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfgZp2ymgfULM_W0je5-NYHZfsr0BIhYjsLIt4V8IsNLyiUNQ/viewform?usp=publish-editor" }
    ]
  },
  "21": { 
    clubName: "UCR", category: "Technical", insta: "https://www.instagram.com/ucrjiit/",
    description: "Microcontroller based Systems and Robotics Hub: The ultimate arena for those who build the future with gears, motors, and code.",
    events: [
      { id: '2101', title: "Grip N' Groove", description: "A solo pick-and-place robotics challenge where participants use a robotic claw bot to move objects.", rules: ["Single-participant event.", "Bot provided by the hub; no personal robots.", "Max time: 10 minutes.", "5 objects to place (+20 pts each, -10 for dropping)."], coordinators: [{ name: "Anshul Singh", phone: "7999021842" }, { name: "Arjun Gupta", phone: "6394131892" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfgZp2ymgfULM_W0je5-NYHZfsr0BIhYjsLIt4V8IsNLyiUNQ/viewform?usp=publish-editor" },
      { id: '2102', title: "RoboSoccer", description: "A fast-paced 1v1 robotics challenge where participants control their robots to score goals against their opponent.", rules: ["1v1 event. Bot provided by the hub.", "Only one attempt per participant.", "Match duration: 3 minutes or first to score 2 goals wins.", "No holding the ball or intentional damage."], coordinators: [{ name: "Anshul Singh", phone: "7999021842" }, { name: "Arjun Gupta", phone: "6394131892" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfgZp2ymgfULM_W0je5-NYHZfsr0BIhYjsLIt4V8IsNLyiUNQ/viewform?usp=publish-editor" }
    ]
  },
  "22": { 
    clubName: "Zencoders", category: "Technical", insta: "https://www.instagram.com/p/DOvyvmRE5IF/",
    description: "The official coding and development hub focused on fostering innovation and technical excellence.",
    events: [
      { id: '2201', title: "Build-Chella", description: "A chaotic, fast-paced creativity festival where participants build something small, ridiculous, and hilarious in just 30 minutes.", rules: ["Individuals or teams of 2-3 members.", "Build a useless or hilarious tech project.", "Strictly 30 minutes for the build, followed by a 1-hour presentation."], coordinators: [{ name: "Soumil Mittal", phone: "9650899350" }, { name: "Aditya Garg", phone: "9911370028" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfgZp2ymgfULM_W0je5-NYHZfsr0BIhYjsLIt4V8IsNLyiUNQ/viewform?usp=publish-editor" },
      { id: '2202', title: "Hack a Match", description: "Participants are randomly paired. Each pair gets random tech prompts and has 2 minutes to create a startup idea.", rules: ["Randomly matched partners or pre-formed teams.", "2 minutes to brainstorm a startup idea.", "30-second elevator pitch delivered to judges."], coordinators: [{ name: "Soumil Mittal", phone: "9650899350" }, { name: "Aditya Garg", phone: "9911370028" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfgZp2ymgfULM_W0je5-NYHZfsr0BIhYjsLIt4V8IsNLyiUNQ/viewform?usp=publish-editor" }
    ]
  },
  
  "23": { 
    clubName: "Yoga, Health and Prahari", category: "Sports & Yoga", insta: "https://www.instagram.com/yogaprahari.jiit?igsh=MWlkN200ZzI4ajlrdQ==",
    description: "Promotes physical fitness, mental well-being, and a healthy lifestyle through various wellness activities and awareness programs.",
    events: [
      { id: '2401', title: "Yoga se hi Hoga", description: "An engaging and energetic event where students participate in a series of exciting yoga pose challenges.", rules: ["Perform yoga poses correctly within a given time."], coordinators: [], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfCV3yOzGnsNFwNpUCLQPVhUbTyedmR9eOillp5_aVsCnSvDw/viewform?usp=publish-editor" },
      { id: '2402', title: "Tote-ally Zen", description: "A fun and creative event where students design and decorate tote bags using painting colors.", rules: [], coordinators: [], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfCV3yOzGnsNFwNpUCLQPVhUbTyedmR9eOillp5_aVsCnSvDw/viewform?usp=publish-editor" }
    ]
  },
  "24": { 
    clubName: "HRUDAY", category: "JBS", insta: "https://www.instagram.com/hruday__thehrclub/",
    description: "A human resource-focused hub that builds leadership, communication, and organizational skills essential for professional growth.",
    events: [
      { id: '2501', title: "The Pirate's Curse", description: "A Day 2 event where participants become a crew of pirates searching for a cursed treasure, while avoiding the secretly chosen 'cursed pirates'.", rules: ["Teams of 2 to 4 participants.", "Round 1: Memorize Pirate Codebook in 30 seconds (no notes).", "Round 2: Live auction to buy clues with 500 coins.", "Round 3: Decode 18 encoded messages using the codebook."], coordinators: [{ name: "Akshat Jain", phone: "8171264990" }, { name: "Ritik Malhotra", phone: "9548674989" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfCV3yOzGnsNFwNpUCLQPVhUbTyedmR9eOillp5_aVsCnSvDw/viewform?usp=publish-editor" }
    ]
  },
  "25": { 
    clubName: "AI/ML", category: "Technical", insta: "https://www.instagram.com/aiml.jiit?igsh=cWhpamdkN3JpaHhs",
    description: "The premier technical hub dedicated to the frontiers of machine intelligence and synthetic creativity.",
    events: [
      { id: '2601', title: "Mind Escape 2.0", description: "A 5v5 fast-paced quiz game where knowledge replaces strength. Teams answer rapid-fire questions, each correct answer pulls the rope toward their side.", rules: ["5v5 Multiplayer room: Red vs Blue.", "Answer correctly to pull the rope.", "3-minute long rounds.", "Timeout winner is the team with the rope closest to their side."], coordinators: [{ name: "Aniket Raj", phone: "7080364785" }, { name: "Arpit Pilania", phone: "7900884172" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfgZp2ymgfULM_W0je5-NYHZfsr0BIhYjsLIt4V8IsNLyiUNQ/viewform?usp=publish-editor" },
      { id: '2602', title: "Zodiac Of The Dammed", description: "An interactive experience where participants can capture their photo and instantly transform it into creative AI-generated portraits.", rules: [], coordinators: [{ name: "Aniket Raj", phone: "7080364785" }, { name: "Arpit Pilania", phone: "7900884172" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfgZp2ymgfULM_W0je5-NYHZfsr0BIhYjsLIt4V8IsNLyiUNQ/viewform?usp=publish-editor" }
    ]
  },
  "26": { 
    clubName: "Ai Tronics", category: "Technical", insta: "https://www.instagram.com/ai_tronics_jiit?igsh=b2VydWo5eGVweHRr",
    description: "An interdisciplinary hub combining artificial intelligence and electronics. It promotes innovation through smart systems, automation, and cutting-edge technological solutions.",
    events: [
      { id: '2701', title: "Digital Escape City", description: "A two-day team-based challenge where participants solve puzzles to escape a simulated digital city.", rules: ["Teams of 2-4 members.", "Round 1: Puzzle Qualification.", "Round 2: Final Escape Challenge simulation."], coordinators: [{ name: "Utkarsh Srivastava", phone: "9044067921" }, { name: "Saniya", phone: "8178394209" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfgZp2ymgfULM_W0je5-NYHZfsr0BIhYjsLIt4V8IsNLyiUNQ/viewform?usp=publish-editor" },
      { id: '2702', title: "Think & Blink", description: "An electronics-based reflex and memory challenge where participants observe LED blinking patterns generated by a microcontroller and reproduce the sequence.", rules: ["Individual participation.", "Observe and reproduce LED blinking sequences.", "No external devices allowed."], coordinators: [{ name: "Muskan Patel", phone: "7974611261" }, { name: "Alok Srivastava", phone: "8299334762" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfgZp2ymgfULM_W0je5-NYHZfsr0BIhYjsLIt4V8IsNLyiUNQ/viewform?usp=publish-editor" }
    ]
  },
  "27": { 
    clubName: "Page Turner Society", category: "Literary", insta: "https://www.instagram.com/thepageturnersociety?igsh=dGphYTlmZjE0NzRy",
    description: "A community for readers and writers that encourages storytelling, discussions, and literary exploration.",
    events: [
      { id: '2801', title: "Jimmy Jab Games", description: "A Duo Edition tournament testing creativity, teamwork, and how well you know your partner across 3 chaotic levels.", rules: ["Teams of two.", "Level 1: Pictionary Showdown (1 min limit).", "Level 2: Mystery Pong (Losing team eats a spicy Oreo).", "Level 3: Best Friends Challenge."], coordinators: [{ name: "Mukta Pande", phone: "9450077094" }, { name: "Arnav Maindola", phone: "8448688927" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfCV3yOzGnsNFwNpUCLQPVhUbTyedmR9eOillp5_aVsCnSvDw/viewform?usp=publish-editor" },
      { id: '2802', title: "Family Feud", description: "A team game where participants guess the most popular answers to survey questions.", rules: ["Teams of 3 to 5 members.", "Guess most popular survey responses.", "After three strikes, the opposing team gets to steal points."], coordinators: [{ name: "Gaurav Solanki", phone: "6367761649" }, { name: "Arnav Maindola", phone: "8448688927" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfCV3yOzGnsNFwNpUCLQPVhUbTyedmR9eOillp5_aVsCnSvDw/viewform?usp=publish-editor" }
    ]
  },
  "28": { 
    clubName: "Marketing Minds", category: "JBS", insta: "https://www.instagram.com/marketingminds.jiit?igsh=MWZwMGE5YXR3bDkycQ==",
    description: "The premier strategic hub designed for the next generation of brand architects and market disruptors.",
    events: [
      { id: '2901', title: "BrandVerse", description: "An interactive marketing-based competition testing participants’ knowledge of brands, creativity, and communication skills.", rules: ["Teams of 2 participants (pre-formed).", "Round 1: 10 Rapid-fire questions.", "Round 2: Brand Act dumb charades (30 secs per team).", "Round 3: 8 preference-based compatibility questions."], coordinators: [{ name: "Kamil Ahmad Khan", phone: "9625130023" }, { name: "Vaishnavi Garg", phone: "9289402584" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfCV3yOzGnsNFwNpUCLQPVhUbTyedmR9eOillp5_aVsCnSvDw/viewform?usp=publish-editor" }
    ]
  },
  "29": { 
    clubName: "Umang", category: "", insta: "#",
    description: "A vibrant hub dedicated to the pursuit of holistic happiness, mental agility, and collective well-being.",
    events: [
      { id: '3001', title: "Dimag Ka Dangal", description: "An event designed to promote happiness, well-being, and mental agility by engaging participants in a series of stimulating cognitive activities.", rules: [], coordinators: [{ name: "Vanshika Aggarwal", phone: "9667994655" }, { name: "Disha Gupta", phone: "8076028865" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfCV3yOzGnsNFwNpUCLQPVhUbTyedmR9eOillp5_aVsCnSvDw/viewform?usp=publish-editor" }
    ]
  },
  "30": { 
    clubName: "Parola X Debsoc", category: "Literary", insta: "https://www.instagram.com/parola.literaryhub/",
    description: "A platform for students passionate about writing, debating, and public speaking.",
    events: [
      { id: '3101', title: "Press Conference", description: "A mock press conference consisting of several reporters and panelists where they face a properly defined agenda about banning a life-extending technology.", rules: ["Panels: Government vs Scientists (4 members per panel).", "Reporters participate individually and question both sides.", "Maintain professionalism and stick to time limits."], coordinators: [{ name: "Mohammad Ali Zia", phone: "9235253255" }, { name: "Pragyan Sharma", phone: "8120529590" }, { name: "Jaisha Arora", phone: "6230582750" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfCV3yOzGnsNFwNpUCLQPVhUbTyedmR9eOillp5_aVsCnSvDw/viewform?usp=publish-editor" },
      { id: '3102', title: "Survival Strategy Challenge", description: "Teams will be given a survival-based scenario and a list of items that must be ranked based on their importance.", rules: ["Team size: 1-3 members.", "Rank survival items in order of importance without phones/internet.", "Rankings compared with an expert benchmark to decide winners."], coordinators: [{ name: "Abhinav Misra", phone: "6398563977" }, { name: "Bhavya Gupta", phone: "7303906635" }], gformLink: "https://docs.google.com/forms/d/e/1FAIpQLSfCV3yOzGnsNFwNpUCLQPVhUbTyedmR9eOillp5_aVsCnSvDw/viewform?usp=publish-editor" }
    ]
  }
};



const ClubDetails = () => {
  const { id } = useParams();
  const pageRef = useRef(null);
  const vantaRef = useRef(null);
  const detailsRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // === VANTA 3D BACKGROUND INITIALIZATION ===
  useEffect(() => {
    let vantaEffect;
    if (window.VANTA) {
      vantaEffect = window.VANTA.RINGS({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: 0x050508, // Match the dark void background
        color: 0xdc2626 // Crimson Red vanta rings to match theme
      });
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  const clubInfo = clubsDatabase[id] || { events: [] };
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);
  const eventInfo = clubInfo.events[selectedEventIndex] || clubInfo.events[0];

  // Animate hero content on load
  useGSAP(() => {
    const tl = gsap.timeline();
    gsap.set('.animate-up', { y: 50, opacity: 0 });
    tl.to('.animate-up', {
      y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2
    });
  }, { scope: pageRef });

  // Animate the dynamic details section when a new event is selected
  useGSAP(() => {
    if(eventInfo && detailsRef.current) {
      gsap.fromTo(detailsRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [selectedEventIndex, id]); 

  const scrollToSlider = () => {
    document.getElementById('events-slider').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={pageRef} className="text-white min-h-screen font-sans selection:bg-red-500/30 overflow-x-hidden flex flex-col relative">
      
      {/* 🌟 GOOGLE FONT INJECTION 🌟 */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
          .font-bebas { font-family: 'Bebas Neue', sans-serif; }
          .glow-highlight { box-shadow: 0 0 40px rgba(220,38,38,0.4); } /* Red glow for active card */
        `}
      </style>

      {/* 🌟 FULL-PAGE VANTA LAYER 🌟 */}
      <div ref={vantaRef} className="fixed inset-0 w-full h-full z-[-2] pointer-events-none" />

      {/* FULL-PAGE UNIFIED DARK OVERLAY */}
      <div className="fixed inset-0 w-full h-full bg-[#050508]/85 z-[-1] pointer-events-none" />

      {/* 🌟 FIXED NAVIGATION BAR (Stacked format to prevent overlap) 🌟 */}
      <nav className="fixed top-0 w-full p-6 md:p-8 flex justify-between items-start z-50 mix-blend-difference pointer-events-none">
        <Link 
          to="/" 
          className="pointer-events-auto group flex items-center gap-2 md:gap-3 text-zinc-400 hover:text-amber-400 hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.8)] transition-all duration-300 tracking-widest uppercase text-[10px] md:text-xs font-bold mt-2"
        >
          <span className="text-lg md:text-xl group-hover:-translate-x-2 transition-transform duration-300">←</span>
          Go Back
        </Link>
        
        <div className="flex flex-col items-end uppercase text-right">
          <div className="font-bebas text-white text-3xl md:text-4xl tracking-widest leading-none">
            IMPRESSIONS<span className="text-red-500">'26</span> 
          </div>
          <div className="text-amber-400 font-bold tracking-[0.2em] text-[10px] md:text-xs mt-1 drop-shadow-md">
            {clubInfo.clubName}
          </div>
        </div>
      </nav>

      {/* 🌟 HERO SECTION: CLUB DESCRIPTION 🌟 */}
      <section className="relative w-full min-h-[80vh] flex flex-col justify-center p-6 md:p-12 overflow-hidden mt-16">
        
        <div className="animate-up relative z-20 w-full max-w-4xl flex flex-col gap-6 p-4">
          <span className="text-red-500 font-bold tracking-[0.3em] uppercase text-sm drop-shadow-md">
            {clubInfo.category} Hub
          </span>
          <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-bebas text-amber-400 tracking-wide drop-shadow-[0_0_30px_rgba(251,191,36,0.5)] uppercase leading-none">
            {clubInfo.clubName}
          </h1>
          <p className="text-zinc-200 leading-relaxed text-lg md:text-xl max-w-3xl font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {clubInfo.description}
          </p>
          
          <div className="mt-4 flex pointer-events-auto">
            <a 
              href={clubInfo.insta !== "#" ? clubInfo.insta : "https://instagram.com"} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-amber-500 text-white font-bold tracking-widest uppercase text-xs hover:scale-105 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all duration-300"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              Follow on Instagram
            </a>
          </div>
        </div>

        <div 
          onClick={scrollToSlider}
          className="animate-up absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20 group pointer-events-auto"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-zinc-300 font-bold group-hover:text-amber-400 transition-colors drop-shadow-md">
            View Events
          </span>
          <div className="animate-bounce w-8 h-12 rounded-full border-2 border-zinc-400 flex justify-center p-1 group-hover:border-red-500 transition-colors shadow-lg">
            <div className="w-1.5 h-3 bg-zinc-300 rounded-full group-hover:bg-red-500 transition-colors" />
          </div>
        </div>

      </section>

      {/* THE EVENTS SLIDER (GLASSMORPHISM CARDS) */}
      <section id="events-slider" className="relative w-full pt-12 pb-6 z-10 pointer-events-auto">
        <div className="px-6 md:px-12 mb-8 flex flex-col gap-2">
            <h2 className="text-5xl md:text-6xl font-bebas tracking-wide uppercase text-white drop-shadow-lg">
              Events
            </h2>
            <p className="text-red-500 tracking-widest uppercase text-xs font-bold drop-shadow-lg">
              Swipe to select an event
            </p>
        </div>

        {clubInfo.events.length > 0 ? (
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={clubInfo.events.length > 2} 
            speed={800} 
            slideToClickedSlide={true} 
            onRealIndexChange={(swiper) => setSelectedEventIndex(swiper.realIndex)} 
            mousewheel={{ forceToAxis: true }}
            coverflowEffect={{ rotate: 10, stretch: 0, depth: 100, modifier: 2, slideShadows: false }}
            modules={[EffectCoverflow, Mousewheel]}
            className="w-full py-10 !overflow-visible" 
          >
            {clubInfo.events.map((event, index) => {
              const isActive = index === selectedEventIndex;

              return (
                <SwiperSlide key={event.id} className="!w-[280px] md:!w-[400px]">
                  <div 
                    className={`w-full aspect-[4/3] rounded-3xl bg-gradient-to-br from-white/[0.08] to-transparent backdrop-blur-xl border flex flex-col justify-end p-6 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-500 relative group cursor-pointer ${
                      isActive ? 'border-red-500/50 glow-highlight scale-105 bg-white/[0.12]' : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                    }`}
                  >
                    <div className="absolute top-4 right-6 text-[80px] md:text-[100px] font-black leading-none text-black/40 select-none pointer-events-none transition-colors duration-500">
                      {(index + 1).toString().padStart(2, '0')}
                    </div>

                    <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-[80px] pointer-events-none transition-all duration-500 ${
                      isActive ? 'bg-red-600/40' : 'bg-white/5 group-hover:bg-white/10'
                    }`} />

                    <div className="relative z-10 flex flex-col gap-2 pointer-events-none">
                      <h3 className={`text-2xl md:text-4xl font-bebas uppercase tracking-wide transition-colors duration-300 ${isActive ? 'text-amber-400' : 'text-zinc-200'}`}>
                        {event.title}
                      </h3>
                      
                      {isActive && (
                        <div className="mt-1 flex items-center gap-2 animate-pulse">
                           <div className="w-2 h-2 rounded-full bg-amber-400" />
                           <p className="text-[10px] tracking-widest uppercase font-bold text-amber-400">
                             Selected
                           </p>
                        </div>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
           <div className="px-6 md:px-12 text-zinc-500 italic">No events found for this club yet.</div>
        )}
      </section>

      {/* 🌟 DYNAMIC EVENT DETAILS PANEL WITH GOOGLE FORMS LINK 🌟 */}
      {eventInfo && (
        <section className="relative w-full pb-24 px-6 md:px-12 z-20 pointer-events-auto flex justify-center">
          <div 
            ref={detailsRef}
            className="w-full max-w-5xl bg-[#121214]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col gap-12"
          >
            {/* Top Row: Description */}
            <div className="flex flex-col gap-4">
              <h3 className="text-4xl md:text-5xl font-bebas text-amber-400 uppercase tracking-wide">About the Event</h3>
              <p className="text-zinc-300 leading-relaxed text-lg font-light">
                {eventInfo?.description}
              </p>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Middle Row: Rules & Regulations */}
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl md:text-4xl font-bebas text-white uppercase tracking-wide">Rules & Guidelines</h3>
              <ul className="flex flex-col gap-3">
                {eventInfo?.rules?.length > 0 ? (
                  eventInfo.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-zinc-300 font-light">
                      <span className="text-red-500 mt-1">❖</span>
                      <span className="leading-relaxed">{rule}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-zinc-500 italic">Rules will be announced soon.</li>
                )}
              </ul>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Bottom Row: Contact Info & REGISTER BUTTON */}
            <div className="flex flex-col gap-6">
              <h3 className="text-3xl md:text-4xl font-bebas text-white uppercase tracking-wide">Contact Info</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {eventInfo?.coordinators?.length > 0 ? (
                  eventInfo.coordinators.map((coord, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between hover:bg-white/10 hover:border-red-500/50 transition-all duration-300 group">
                      <div className="flex flex-col">
                        <span className="text-[10px] tracking-widest uppercase text-red-500 font-bold mb-1">Coordinator</span>
                        <span className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">{coord.name}</span>
                      </div>
                      <a 
                        href={`tel:${coord.phone}`} 
                        className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/50 hover:bg-amber-500 hover:text-black transition-all"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="text-zinc-500 italic">Coordinator details coming soon.</div>
                )}
              </div>
              
              {/* 🌟 NEW GOOGLE FORM REGISTRATION LOGIC 🌟 */}
              {eventInfo?.registrationClosed ? (
                <div className="w-full mt-4 px-10 py-5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-black tracking-[0.2em] uppercase text-sm text-center cursor-not-allowed">
                  Registration Closed
                </div>
              ) : (
                <a 
                  href={eventInfo?.gformLink || "#"} 
                  target="_blank" 
                  rel="noreferrer"
                  className="block w-full text-center mt-4 px-10 py-5 rounded-xl bg-amber-500 text-zinc-950 font-black tracking-[0.2em] uppercase text-sm hover:bg-amber-400 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] transition-all duration-300"
                >
                  Register for {eventInfo?.title}
                </a>
              )}

            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
<footer className="w-full bg-[#030305]/60 backdrop-blur-lg pt-16 pb-8 px-6 md:px-12 border-t border-white/5 mt-auto z-10 relative pointer-events-none">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
    
    {/* Logo */}
    <h2 className="font-bebas text-4xl tracking-wide text-white drop-shadow-md">
      IMPRESSIONS<span className="text-red-500">'26</span>
    </h2>

    {/* Developers */}
    <div className="text-zinc-400 text-xs tracking-wide">
      <p className="uppercase text-[10px] mb-1">Developed by</p>
      <p className="text-white font-medium">
        Smriti Gaur  •  Mishthi Abrola  •  Aditya Singh   •  Abeer Sharma
      </p>
    </div>

    {/* Copyright */}
    <p className="text-zinc-400 text-[10px] tracking-widest uppercase font-medium">
      © 2026 IMPRESSIONS. All rights reserved.
    </p>

  </div>
</footer>

    </div>
  );
};

export default ClubDetails;