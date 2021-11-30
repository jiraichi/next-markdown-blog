import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {marked} from 'marked'
import Link from 'next/link'

const getStaticPaths = () => {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map(fileName => ({
    params: { slug: fileName.replace('.md', '') }
  }))

  return {
    paths,
    fallback: false
  }
}

const getStaticProps = ({ params: { slug } }) => {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  )
  const { data: frontmatter, content } = matter(markdownWithMeta)

  return {
    props: {
      frontmatter,
      slug,
      content
    }
  }
}

const PostPage = ({
  frontmatter: { title, date, cover_image },
  slug,
  content
}) => {
  return (
    <>
      <Link href="/">
        <a className="btn btn-back">Go back</a>
      </Link>
      <div className="card card-page">
        <h1 className="post-title">{title}</h1>
        <div clasName="post-date">Posted on {date}</div>
        <img src={cover_image} alt={slug + ' cover image'} />
        <div className="post-body">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </>
  )
}

export { PostPage as default, getStaticPaths, getStaticProps }
