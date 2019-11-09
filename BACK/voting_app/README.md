# README

## BIENVENU

Etape pour ajouter des donnees fake:

    cd /BACK/voting_app
    rails c
    v = Voter.new first_name: 'Rakoto', last_name: 'Naivo', cin: '0000000000000'
    v.save
    v._keywords

