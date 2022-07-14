import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { getGithubRepoDetails, getGithubReadmeContent } from '../../utils/utils';
import { GitFileInterface } from '../../constants/constants';
import { RepoListPageWrapper, ReadmeWrapper } from './style';

const UserDetails = () => {
    const { userAccount, repoName } = useParams();
    const [repoDetails, setRepoDetails] = useState<GitFileInterface[]>([]);
    const [readmeFileContent, setReadmeFileContent] = useState<string>('');

    useEffect(() => {
        if (userAccount && repoName) {
            getUserRepos();
        }
    }, [userAccount, repoName]);

    const getUserRepos = async () => {
        try {
            const gitRepoDetailsRS = await getGithubRepoDetails(userAccount!, repoName!);
            if (gitRepoDetailsRS.status === 404) {
                throw new Error('No Repo');
            }
            const gitRepoDetails = await gitRepoDetailsRS.json();
            setRepoDetails(gitRepoDetails);
            const readmeFile = gitRepoDetails.find((file: GitFileInterface) => (file.name === "README.md"));
            const readmeFileContentPath = readmeFile.download_url;
            const contentRS = await getGithubReadmeContent(readmeFileContentPath);
            const contentBlob = await contentRS.blob();
            const contentBlobText = await contentBlob.text();
            setReadmeFileContent(contentBlobText);
        } catch (error: unknown) {
            if (error instanceof Error && error.message === 'No Repo') {
                alert("This repository is empty.")
            };
            setRepoDetails([]);
            setReadmeFileContent('');
        }
    };

    return (
        <RepoListPageWrapper>
            <Helmet>
                <meta name="description" content="A GitHub repo details page" />
            </Helmet>
            <List>
                {repoDetails.map((file: GitFileInterface) => (
                    <ListItem key={file.sha} disablePadding>
                        <ListItemIcon><InsertDriveFileIcon /></ListItemIcon>
                        <ListItemText primary={file.name} />
                    </ListItem>
                ))}
            </List>
            <ReadmeWrapper>
                <ReactMarkdown children={readmeFileContent} />
            </ReadmeWrapper>
        </RepoListPageWrapper>
    );
};

export default UserDetails;
