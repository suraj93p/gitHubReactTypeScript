export const GIT_HUB_REPO_SEARCH = 'https://api.github.com/search/repositories?q=';
export const GIT_HUB_REPO_SEARCH_FOR_USERS = 'https://api.github.com/users/<username>/repos';
export const GIT_HUB_REPO_DETAILS = 'https://api.github.com/repos/<username>/<reponame>/contents/';

export interface GitRepoUser {
    login: string;
}

export interface GitSearchResponseInterface {
    id: number;
    full_name: string;
    name: string;
    owner: GitRepoUser;
}

export interface GitFileInterface {
    download_url: string;
    name: string;
    sha: string;
}
