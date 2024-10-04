import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

// interface CommentBoxProps {
//     userImage: ""
//     userName: ""
//     rating: number
//     comment: string
//     date: string
// }

export default function CommentBox({ userImage, userName, rating, comment, date }) {
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                staggerChildren: 0.1
            }
        }
    }

    const childVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20
            }
        }
    }

    return (
        <motion.div
            className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div className="flex items-center mb-4" variants={childVariants}>
                <img
                    src={userImage}
                    alt={userName}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-yellow-500"
                />
                <h3 className="text-xl font-semibold text-white">{userName}</h3>
            </motion.div>

            <motion.div className="flex mb-3" variants={childVariants}>
                {[...Array(5)].map((_, index) => (
                    <Star
                        key={index}
                        className={`w-6 h-6 ${index < rating ? 'text-yellow-500' : 'text-gray-500'}`}
                        fill={index < rating ? 'currentColor' : 'none'}
                    />
                ))}
            </motion.div>

            <motion.p
                className="text-gray-300 mb-4"
                variants={childVariants}
            >
                {comment}
            </motion.p>

            <motion.p
                className="text-sm text-gray-500"
                variants={childVariants}
            >
                {date}
            </motion.p>
        </motion.div>
    )
}