/*
* <license header>
*/


import React, { useEffect, useState } from 'react'
import { Content, Heading, View } from '@adobe/react-spectrum'
import user from '@adobe/exc-app/user'

function UserProperties() { 
    const [userProperties, setUserProperties] = useState({});

    useEffect(() => {

        load();

        async function load() {
            const [org, name, orgs, token, profile, locale, subOrg, tenant, languages] = await Promise.all([
                user.get('imsOrg'),
                user.get('imsOrgName'),
                user.get('imsOrgs'),
                user.get('imsToken'),
                user.get('imsProfile'),
                user.get('locale'),
                user.get('subOrg'),
                user.get('tenant'),
                user.get('preferredLanguages')
                ]);
            
            console.log(org);
            setUserProperties({
                org,
                name,
                orgs,
                token,
                profile,
                locale,
                subOrg,
                tenant,
                languages
            })
        }
    }, [user]);

    console.log(userProperties)

    console.log(Object.keys(userProperties))
    return (
        <View>
            <Heading>User Properties</Heading>
            <Content>
                <table>
                    <tbody>
                        {Object.keys(userProperties).map((key, index) => (
                            <tr><td>{key}</td><td><pre>{JSON.stringify(userProperties[key], null, 2)}</pre></td></tr>
                        ))}
                    </tbody>
                </table>
            </Content>
        </View>
    )
}

export default UserProperties
