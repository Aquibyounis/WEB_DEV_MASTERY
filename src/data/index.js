// Central export for all topic data
import { html5Data } from './topics/html5';
import { css3Data } from './topics/css3';
import { javascriptData } from './topics/javascript';
import { reactData } from './topics/react';
import { nodejsData } from './topics/nodejs';
import { pythonData } from './topics/python';
import { databasesData } from './topics/databases';
import { mongodbData } from './topics/mongodb';
import { restapiData } from './topics/restapi';
import { authenticationData } from './topics/authentication';
import { gitData } from './topics/git';
import { performanceData } from './topics/performance';
import { devopsData } from './topics/devops';
import { interviewData } from './topics/interview';
import { miniProjectsData } from './miniProjects';
import { checklistData } from './checklist';

export const allTopics = [
    html5Data,
    css3Data,
    javascriptData,
    reactData,
    nodejsData,
    pythonData,
    databasesData,
    mongodbData,
    restapiData,
    authenticationData,
    gitData,
    performanceData,
    devopsData,
    interviewData,
    miniProjectsData,
    checklistData
];

export const getTopicById = (id) => {
    return allTopics.find(topic => topic.id === id);
};

export {
    html5Data,
    css3Data,
    javascriptData,
    reactData,
    nodejsData,
    pythonData,
    databasesData,
    mongodbData,
    restapiData,
    authenticationData,
    gitData,
    performanceData,
    devopsData,
    interviewData,
    miniProjectsData,
    checklistData
};
