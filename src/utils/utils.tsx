import { GIT_HUB_REPO_SEARCH, GIT_HUB_REPO_SEARCH_FOR_USERS, GIT_HUB_REPO_DETAILS } from '../constants/constants';

export const getGithubRepos = (username: string): Promise<Response> => {
    return fetch(`${GIT_HUB_REPO_SEARCH}${username}`);
};

export const getGithubReposForUser = (username: string): Promise<Response> => {
    return fetch(`${GIT_HUB_REPO_SEARCH_FOR_USERS.replace('<username>', username)}`);
};

export const getGithubRepoDetails = (username: string, repoName: string): Promise<Response> => {
    return fetch(`${GIT_HUB_REPO_DETAILS.replace('<username>', username).replace('<reponame>', repoName)}`);
};

export const getGithubReadmeContent = (git_url: string): Promise<Response> => {
    return fetch(git_url);
};
