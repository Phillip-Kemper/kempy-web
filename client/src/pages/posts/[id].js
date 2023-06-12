import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import { Main } from "@/templates/Main";

export default function Post({ postData }) {
  return (
    <Main>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
      <div className="border-b border-white ">
        <h1 className='text-3xl'>{postData.title}</h1>
        <div className='text-2xl pb-8'>
          <Date dateString={postData.date} />
        </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Main>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}