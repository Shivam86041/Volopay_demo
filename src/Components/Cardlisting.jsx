import React, { useState, useEffect } from 'react';
import "../Components/Css/Card.css";

const YOUR_USER_ID = 1; // Replace with the actual user ID

const CardListing = () => {
  const [activeTab, setActiveTab] = useState('your');
  const [cards, setCards] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [cardTypeFilter, setCardTypeFilter] = useState('');

  useEffect(() => {
    fetchCards(); // Fetch initial cards
    window.addEventListener('scroll', handleScroll); // Set up infinite scroll listener

    return () => {
      window.removeEventListener('scroll', handleScroll); // Clean up scroll listener
    };
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      hasMore
    ) {
      fetchCards(nextPage); // Load more cards
    }
  };

  const fetchCards = (page = 1) => {

    setTimeout(() => {
      const response = {
        data: [
          {
            name: 'Mixmax',
            budget_name: 'Software subscription',
            owner_id: 1,
            spent: {
              value: 100,
              currency: 'SGD',
            },
            available_to_spend: {
              value: 1000,
              currency: 'SGD',
            },
            card_type: 'burner',
            expiry: '9 Feb',
            limit: 100,
            status: 'active',
          },
          {
            name: 'Quickbooks',
            budget_name: 'Software subscription',
            owner_id: 2,
            spent: {
              value: 50,
              currency: 'SGD',
            },
            available_to_spend: {
              value: 250,
              currency: 'SGD',
            },
            card_type: 'subscription',
            limit: 10,
            status: 'active',
          },
        ],
        page: page,
        per_page: 10,
        total: 100,
      };

      setCards((prevCards) => [...prevCards, ...response.data]);
      setNextPage(response.page + 1);
      setHasMore(response.page < response.total / response.per_page);
    }, 500); // Simulating a delay for the API response
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    fetchCards();
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCardTypeFilter = (event) => {
    setCardTypeFilter(event.target.value);
    // Fetch cards based on the selected card type filter
    fetchCards();
  };

  // Filter cards based on the active tab
  const filteredCards = cards.filter((card) => {
    if (activeTab === 'your') {
      return card.owner_id === YOUR_USER_ID;
    } else if (activeTab === 'all') {
      return true;
    } else if (activeTab === 'blocked') {
      // Replace blockedIds with the actual list of blocked IDs in your data model
      //  return blockedIds.includes(card.owner_id);
    }
    return false;
  });

  // Filter cards based on search query
  const searchedCards = filteredCards.filter((card) =>
    card.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter cards based on card type
  const filteredByCardTypeCards =
    cardTypeFilter === ''
      ? searchedCards
      : searchedCards.filter((card) => card.card_type === cardTypeFilter);

  return (
    <div>
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'your' ? 'active' : ''}`}
          onClick={() => handleTabChange('your')}
        >
          Your
        </button>
        <button
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => handleTabChange('all')}
        >
          All
        </button>
        <button
          className={`tab ${activeTab === 'blocked' ? 'active' : ''}`}
          onClick={() => handleTabChange('blocked')}
        >
          Blocked
        </button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by card name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select
          value={cardTypeFilter}
          onChange={handleCardTypeFilter}
          className="card-type-filter"
        >
          <option value="">All Card Types</option>
          <option value="burner">Burner</option>
          <option value="subscription">Subscription</option>
        </select>
      </div>

      <div className="card-list">
        {filteredByCardTypeCards.map((card) => (
          <div className="card" key={card.id}>
            <div className="card-header">
              <div className="card-type">{card.card_type}</div>
            </div>
            <div className="card-body">
              <div className="card-name">{card.name}</div>
              <div className="card-details">
                {card.card_type === 'burner' && (
                  <div className="expiry">Expiry: {card.expiry}</div>
                )}
                {card.card_type === 'subscription' && (
                  <div className="limit">Limit: {card.limit}</div>
                )}
                <div className="status">Status: {card.status}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
    
  );
};


export default CardListing;
