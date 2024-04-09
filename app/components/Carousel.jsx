import { useLoaderData, Link } from '@remix-run/react';
import { Image} from '@shopify/hydrogen';

export function Carousel({ collections }) {
 // Assuming collections is an array of collections fetched from your GraphQL query
 // and each collection is an object with properties like id, title, handle, etc.

 return (
    <section class="carousel" aria-label="Gallery">
      <ol class="carousel__viewport">
        {collections.map((collection, index) => (
          <li key={collection.id} id={`carousel__slide${index + 1}`} tabindex="0" class="carousel__slide">
            <div className="collections-grid">
              <CollectionItem collection={collection} index={index} />
            </div>
            <div class="carousel__snapper"></div>
            <a href={`#carousel__slide${index === 0 ? collections.length : index}`} class="carousel__prev">Go to previous slide</a>
            <a href={`#carousel__slide${index === collections.length - 1 ? 1 : index + 2}`} class="carousel__next">Go to next slide</a>
          </li>
        ))}
        </ol>
      <aside class="carousel__navigation">
        <ol class="carousel__navigation-list">
          {collections.map((_, index) => (
            <li key={index} class="carousel__navigation-item">
              <a href={`#carousel__slide${index + 1}`} class="carousel__navigation-button">Go to slide {index + 1}</a>
            </li>
          ))}
           </ol>
      </aside>
    </section>
 );
}

function CollectionItem({ collection, index }) {
 return (
    <Link
      className="collection-item"
      key={collection.id}
      to={`/collections/${collection.handle}`}
      prefetch="intent"
    >
      <h5>{collection.title}</h5>

        <Image
          // alt={collection.image.altText || collection.title}
          aspectRatio="1/1"
          data={collection.image}
          loading={index < 3 ? 'eager' : undefined}
        />
    </Link>
 );
}