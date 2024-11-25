import statisticsTemplate from './statistics.hbs';
import Action from '../../api/modules/action';

class StatisticsPage {
    async render() {
        const statistics = await new Action().getStatistics();
        const statisticsJSON = await statistics.json();

        return statisticsTemplate({ statistics: statisticsJSON });
    }

    async attachEventListeners() {

    }
}

export default StatisticsPage;
