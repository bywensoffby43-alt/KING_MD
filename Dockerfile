FROM quay.io/qasimtech/mega-md:latest

WORKDIR /root/king_md

RUN git clone https://github.com/bywensoffby43-alt/KING_MD . && \
    npm install

EXPOSE 5000

CMD ["npm", "start"]
