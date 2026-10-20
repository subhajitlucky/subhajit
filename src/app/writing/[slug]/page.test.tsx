import { generateMetadata } from './page';

describe('writing post metadata', () => {
  it('gives each post its own Twitter card metadata', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'kalia-build-log' }),
    });

    expect(metadata.twitter).toEqual(
      expect.objectContaining({
        card: 'summary_large_image',
        title: expect.stringContaining('Training a 58M language model'),
        description: expect.stringContaining('Zero dollars'),
      }),
    );
  });
});
