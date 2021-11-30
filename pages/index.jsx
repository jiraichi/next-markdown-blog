import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import Head from 'next/head'

import Post from '../components/Post'

import sortByDate from '../utils'

const getStaticProps = async () => {
  // apparently nextjs is smart enough to allow us to use fs in here (normally using fs in client side code will not compile)
  const files = fs.readdirSync(path.join('posts'))

  const posts = files.map(fileName => {
    const slug = fileName.replace('.md', '')

    const markDownWithMeta = fs.readFileSync(
      path.join('posts', fileName),
      'utf-8'
    )

    const { data: frontmatter } = matter(markDownWithMeta)

    return {
      slug,
      frontmatter
    }
  })
  return {
    props: {
      posts: posts.sort(sortByDate)
    }
  }
}

const Home = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>My Blog</title>
        <meta name="description" content="A project created for fun." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="posts">
        {posts.map((post, index) => {
          return <Post post={post} />
        })}
      </div>
    </div>
  )
}

export { Home as default, getStaticProps }
