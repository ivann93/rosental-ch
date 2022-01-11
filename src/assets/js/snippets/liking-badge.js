const likingBadgeTexts = {
  variant1:
    '<strong>{{ name }}</strong> und <strong>{{ likes }}</strong> anderen gefällt dieses Produkt',
  variant2:
    '<strong>{{ name }}</strong> und <strong>{{ likes }}</strong> andere lieben dieses Produkt',
};

// prettier-ignore
const getRandomNumberBetween = (min, max) => Math.round(Math.random() * (max - min) + min);

function renderLikingBadges() {
  if (typeof window.drip === 'undefined') return;

  const likingBadgeElements = document.querySelectorAll('.liking-badge');

  if (likingBadgeElements.length === 0) return;

  const { productId } = window;

  let likesCount = getLocalStorage(`likes-${productId}`);

  if (!likesCount) {
    likesCount = getRandomNumberBetween(380, 1537).toString();

    setLocalStorage(`likes-${productId}`, likesCount);
  }

  let text = likingBadgeTexts[window.drip.testVariant];
  text = text.replace('{{ name }}', 'Nina Moghadamm');
  text = text.replace('{{ likes }}', likesCount);

  likingBadgeElements.forEach(badgeElement => {
    const textElement = badgeElement.querySelector('.liking-badge__text');

    textElement.innerHTML = text;
  });
}

renderLikingBadges();
