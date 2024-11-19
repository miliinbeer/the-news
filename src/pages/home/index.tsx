import { ref, set } from 'firebase/database'
import React, { FC, useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useSelector } from 'react-redux'

import { database } from '../../app/firebase'
import disliked from '../../shared/icons/disliked.webp'
import liked from '../../shared/icons/liked.webp'
import { PostTypes, StatePostTypes } from '../../shared/types'
import { CardWidget } from '../../shared/ui-kit/card'
import { LoaderWidget } from '../../shared/ui-kit/loader'
import { PageContainer } from '../../shared/ui-kit/page-container'
import { HeaderWidget } from '../../widgets/header-widget'
import { Cards, ScrollLoader, LoaderContainer, Like } from './styles'

export const HomePage: FC = () => {
  const { loading, posts, user } = useSelector((state: StatePostTypes) => state.root)

  const [displayCount, setDisplayCount] = useState(6)

  const hasMorePosts = displayCount < posts.length

  const [infiniteRef] = useInfiniteScroll({
    loading,
    hasNextPage: hasMorePosts,
    onLoadMore: () => {
      if (hasMorePosts) {
        setTimeout(() => {
          setDisplayCount((prevCount) => prevCount + 9)
        }, 1000)
      }
    }
  })

  const handleLike = async (postId: string | undefined) => {
    const updatedPosts = posts.map((el: PostTypes) => {
      if (el.id === postId) {
        const isLiked = el?.likes?.find((id) => id === user?.uid)
        let updatedLikes

        if (isLiked) {
          updatedLikes = el?.likes?.filter((id) => id !== user?.uid)
        } else {
          updatedLikes = el.likes ? [...el.likes, user?.uid] : [user?.uid]
        }

        return {
          ...el,
          likes: updatedLikes
        }
      }

      return el
    })

    const postsRef = ref(database, 'posts/')

    try {
      await set(postsRef, updatedPosts)
    } catch (error) {
      console.error('Возникла ошибка:', error)
    }
  }

  // TODO: Посты отображаються в хаотичном порядке
  return (
    <>
      <HeaderWidget />
      <PageContainer>
        {posts.length > 0 ? (
          <Cards>
            {posts.slice(0, displayCount).map((el: PostTypes) => {
              const isLiked = el.likes ? el.likes.includes(user?.uid) : false
              return (
                <CardWidget
                  isLiked={
                    <Like onClick={() => handleLike(el.id)}>
                      <img src={isLiked ? liked : disliked} alt="like" />
                    </Like>
                  }
                  key={el.id}
                  id={el.id}
                  title={el.title}
                  image={el.image}
                  content={el.content}
                  date={el.date}
                  link={new URL(el.link).hostname}
                  author={el.author}
                />
              )
            })}
          </Cards>
        ) : (
          <LoaderContainer>
            <LoaderWidget />
          </LoaderContainer>
        )}
        <div ref={infiniteRef}>{hasMorePosts && <ScrollLoader>Загрузка...</ScrollLoader>}</div>
      </PageContainer>
    </>
  )
}
