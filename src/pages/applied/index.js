import React from 'react';
import { Text, Image, View, FlatList } from 'react-native';
import { Input } from '../../components/Input';
import { Button, OutlineButton } from '../../components/Button';
import { TextTabs } from '../../components/Tab';
import Icon from 'react-native-vector-icons/Ionicons';
import { APJobCard } from '../../components/Card/APJobCard';
import { JobCard } from '../../components/Card/JobCard';
import { Layout } from '../../components/layout';
import { Section } from '../../components/section';

export default function Applied() {
    return (
        <Layout active={2}>
            <TextTabs tabsContent={["All", "Awarded", "Past"]} onTabChange={(e) => console.log(e)} />

            <Section>
                <FlatList
                    renderItem={() => <APJobCard></APJobCard>}
                    data={[1, 2, 3, 4, 5, 6, 5, 4, 32, 2]}
                />


            </Section>
        </Layout>
    );
}
