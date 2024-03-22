"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react';
import { reviewPost } from '@/lib/actions';
import { useRouter } from 'next/navigation';

const facets = ['Adventurous', 'Clean', 'Good listener', 'Honest', 'Humorous', 'Inspiring', 'Kind', 'Knowledgeable', 'Non-judgemental', 'Spontaneous', 'Talkative', 'Thoughtful', 'Trustworthy']

export default function Home() {
    const [safety, setSafety] = useState(0);
    const [communication, setCommunication] = useState(0);
    const [recommend, setRecommend] = useState('');
    const [facetArr, setFacetArr] = useState([]);
    const [feedbackText, setFeedbackText] = useState('');

    const router = useRouter();

    const handleSubmit = async () => {
        const formData = {
            safety, communication, recommend, facetArr, feedbackText
        }
        await reviewPost(formData);
        await router.push('/submitted');
    }


    const handleSafety = (starIndex) => {
        setSafety(starIndex + 1);
    };
    const handleCommunication = (starIndex) => {
        setCommunication(starIndex + 1);
    };
    const handleRecommend = (option) => {
        setRecommend(option);
    };
    const handleFacets = (index) => {
        const selectedFacet = facets[index];
        if (!facetArr.includes(selectedFacet)) {
            setFacetArr([...facetArr, selectedFacet]);
        } else {
            const updatedFacets = facetArr.filter((facet) => facet !== selectedFacet);
            setFacetArr(updatedFacets);
        }
    }
    return (
        <div className={styles.home}>
            <div className={styles.header}>
                <Image src="/close.png" alt="" width={20} height={20} />
                <p>Leave a review</p>
            </div>
            <div className={styles.reviews}>
                <div className={styles.review}>
                    <div className={styles.reviewText}>
                        <h3>Safety</h3>
                        <p>How safe did you feel with Trausti?</p>
                    </div>
                    <div className={styles.stars}>
                        {[1, 2, 3, 4, 5].map((index) => (
                            <Image
                                key={index}
                                src='/star.svg'
                                alt=''
                                width={30}
                                height={30}
                                className={index <= safety ? styles.goldenStar : styles.star}
                                onClick={() => handleSafety(index - 1)}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.review}>
                    <div className={styles.reviewText}>
                        <h3>Communication</h3>
                        <p>How easy was to communicate with Trausti?</p>
                    </div>
                    <div className={styles.stars}>
                        {[1, 2, 3, 4, 5].map((index) => (
                            <Image
                                key={index}
                                src='/star.svg'
                                alt=''
                                width={30}
                                height={30}
                                className={index <= communication ? styles.goldenStar : styles.star}
                                onClick={() => handleCommunication(index - 1)}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.review}>
                    <div className={styles.reviewText}>
                        <h3>Would you recommend Trausti?</h3>
                        <p>Your opinion won&apos;t be posted publicly</p>
                    </div>
                    <div className={styles.likes}>
                        <Image src='/dislike.svg' alt='' width={50} height={50} className={recommend === 'no' ? styles.dislike : styles.thumb} onClick={() => handleRecommend('no')} />
                        <p className={styles.first}>No</p>
                        <Image src='/like.svg' alt='' width={50} height={50} className={recommend === 'yes' ? styles.like : styles.thumb} onClick={() => handleRecommend('yes')} />
                        <p>Yes</p>
                    </div>
                </div>
                <div className={styles.review}>
                    <div className={styles.reviewText}>
                        <h3>Praise</h3>
                        <p>What best describes Trausti?</p>
                    </div>
                    <div className={styles.facets}>
                        {facets.map((facet, index) => (
                            <div key={index} onClick={() => handleFacets(index)} className={facetArr.includes(facet) ? styles.selectedFacet : styles.unselectedFacet}>
                                {facet}
                            </div>
                        ))}

                    </div>
                </div>
                <div className={styles.review}>
                    <div className={styles.reviewText}>
                        <h3>Care to share more?</h3>
                        <p>How was your overall experience? What&apos;s that one thing you won&apos;t forget Trausti for?</p>
                    </div>
                    <textarea className={styles.feedback} name="feedback" id="" placeholder='Come on, you know the drill' value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}></textarea>
                </div>
            </div>
            {(safety || communication || recommend || facetArr.length > 0 || feedbackText) && (
                <button onClick={handleSubmit} className={styles.publish}>Publish Review</button>
            )}

        </div>
    )
}
