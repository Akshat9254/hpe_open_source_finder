from fuzzywuzzy import process
word_list = ['apple', 'banana', 'orange',
             'grape', 'peach', 'mango', 'kiwi', 'pear']


def extract_top_n_words(keywords, n, threshold=50):
    scores = {}
    for keyword in keywords:
        for word in word_list:
            score = process.extractOne(keyword, [word])
            if score[1] > threshold:
                if word not in scores:
                    scores[word] = score[1]
                else:
                    scores[word] += score[1]

    print(scores)

    sorted_words = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    return [word[0] for word in sorted_words[:n]]


keywords = ['kiwee', 'man', 'go', 'apple']

top_words = extract_top_n_words(keywords, n=3)
print(top_words)
