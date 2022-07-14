import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { getGithubRepos } from '../../utils/utils';
import { GitSearchResponseInterface } from '../../constants/constants';

const HomePage = () => {
    const [gitUsers, setGitUsers] = useState<GitSearchResponseInterface[]>([]);
    const [userSearch, setUserSearch] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        if (userSearch.length) {
            debouncedSearch(userSearch);
        }
    }, [userSearch]);

    const debouncedSearch = React.useRef(
        debounce(async (userSearch) => {
            try {
                const gitSearchResultRS = await getGithubRepos(userSearch);
                const gitSearchResult = await gitSearchResultRS.json();
                setGitUsers(gitSearchResult.items || []);
            } catch (e) {
                setGitUsers([]);
            }
        }, 300),
    ).current;

    const onUserSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        setUserSearch(value);
    };

    const onUserClick = (gitUser: GitSearchResponseInterface) => {
        navigate(`/account/${gitUser.owner.login}`);
    };

    const getLabelForOptions = (option: GitSearchResponseInterface) => {
        return option.full_name || '';
    };

    return (
        <>
            <Helmet>
                <meta name="description" content="A GitHub user search and view website" />
            </Helmet>
            <Autocomplete
                id="gitUsers"
                className='gituser-autocomplete'
                options={gitUsers}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Git Users"
                        value={userSearch}
                        onChange={onUserSearchChange}
                        variant="outlined"
                    />
                )}
                getOptionLabel={getLabelForOptions}
                onChange={(_, value) => onUserClick(value!)}
                style={{ width: 270 }}
            />
        </>
    );
};

export default HomePage;
