import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from "react-router-dom";
import { List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import { getGithubReposForUser } from '../../utils/utils';
import { GitSearchResponseInterface } from '../../constants/constants';

const UserDetails = () => {
    const { userAccount } = useParams();
    const navigate = useNavigate();
    const [reposList, setReposList] = useState<GitSearchResponseInterface[]>([]);

    useEffect(() => {
        if (userAccount) {
            getUserRepos();
        }
    }, [userAccount]);

    const getUserRepos = async () => {
        try {
            const gitReposForUserRS = await getGithubReposForUser(userAccount!);
            const gitReposForUser = await gitReposForUserRS.json();
            setReposList(gitReposForUser);
        } catch (e) {
            setReposList([]);
        }
    };

    const handleRepoClick = (repo: GitSearchResponseInterface) => {
        navigate(`/account/${userAccount}/repo/${repo.name}`);
    }

    return (
        <>
            <Helmet>
                <meta name="description" content="A GitHub user details page" />
            </Helmet>
            <List>
                {reposList.map((repo: GitSearchResponseInterface) => (
                    <ListItem key={repo.id} onClick={() => handleRepoClick(repo)} disablePadding>
                        <ListItemButton>
                            <ListItemText>{repo.full_name}</ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default UserDetails;
