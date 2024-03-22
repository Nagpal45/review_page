import React from 'react'
import styles from '../page.module.css'
import Image from 'next/image'
export default function ReviewSubmitted() {
  return (
    <div className={styles.submitted}>
        <p>Thanks for posting your review !!!</p>
        <Image src= '/smile.png' width={400} height={200} alt=''/>
    </div>
  )
}
