import { useState, useMemo } from 'react';

export function useSearch(topics) {
    const [searchQuery, setSearchQuery] = useState('');

    const searchResults = useMemo(() => {
        if (!searchQuery.trim()) return [];

        const query = searchQuery.toLowerCase();
        const results = [];

        topics.forEach(topic => {
            // Search in topic title
            if (topic.title.toLowerCase().includes(query)) {
                results.push({
                    type: 'topic',
                    topicId: topic.id,
                    title: topic.title,
                    match: topic.title
                });
            }

            // Search in subtopics
            if (topic.subtopics) {
                topic.subtopics.forEach(subtopic => {
                    if (subtopic.title.toLowerCase().includes(query)) {
                        results.push({
                            type: 'subtopic',
                            topicId: topic.id,
                            subtopicId: subtopic.id,
                            title: subtopic.title,
                            parentTitle: topic.title,
                            match: subtopic.title
                        });
                    }

                    // Search in content
                    if (subtopic.concept && subtopic.concept.toLowerCase().includes(query)) {
                        const matchIndex = subtopic.concept.toLowerCase().indexOf(query);
                        const start = Math.max(0, matchIndex - 30);
                        const end = Math.min(subtopic.concept.length, matchIndex + query.length + 30);
                        const match = '...' + subtopic.concept.slice(start, end) + '...';

                        results.push({
                            type: 'content',
                            topicId: topic.id,
                            subtopicId: subtopic.id,
                            title: subtopic.title,
                            parentTitle: topic.title,
                            match: match
                        });
                    }

                    // Search in interview questions
                    if (subtopic.interviewQuestions) {
                        subtopic.interviewQuestions.forEach((qa, index) => {
                            if (qa.question.toLowerCase().includes(query)) {
                                results.push({
                                    type: 'interview',
                                    topicId: topic.id,
                                    subtopicId: subtopic.id,
                                    title: `Q: ${qa.question}`,
                                    parentTitle: topic.title,
                                    match: qa.question
                                });
                            }
                        });
                    }
                });
            }
        });

        return results.slice(0, 20); // Limit results
    }, [topics, searchQuery]);

    return {
        searchQuery,
        setSearchQuery,
        searchResults,
        hasResults: searchResults.length > 0
    };
}

export default useSearch;
